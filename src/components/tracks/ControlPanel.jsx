import React, { useEffect, useReducer, useState } from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordButton from './RecordButton';
import Timer from './Timer';
import { useTimer } from 'react-timer-hook';

const controlPanelStyle = {
	display: 'flex',
	width: '100%',
	height: '200px',
	backgroundColor: Colors.black,
	alignItems: 'center',
};

const initialState = {
	recording: false,
	countingDown: false,
	playingAudio: false
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'RECORDING_STARTED':
			return {...state, recording: true, playingAudio: true, countingDown: false};
		case 'RECORDING_ENDED':
			return {...state, recording: false, playingAudio: false};
		case 'COUNTDOWN_STARTED':
			return {...state, countingDown: true};
		case 'COUNTDOWN_ENDED':
			return {...state, countingDown: false};
		default:
			return initialState;
	}
}

const ControlPanel = (props) => {
	const { audioContext, addMediaBlobUrl, mediaBlobUrls, playAudio, isPlaying, audioSource } = props;
	const [numBars, setNumBars ] = useState(undefined);
	const [state, dispatch] = useReducer(reducer, initialState);
	const bpm = 120;
	const beatsPerBar = 4;
	const [expiryTimestamp, setExpiryTimestamp] = useState(undefined);
	const { status, startRecording, stopRecording } = useReactMediaRecorder({
		video: false,
		audio: true,
		blobOptions: { type: 'audio/mpeg' },
		onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
	});

	const startCountdown = () => {
		setTimer(3);
	}

	const onCountdownFinished = () => {
		startLoopRecording();
		dispatch({type: 'RECORDING_STARTED'});
	}

	const onRecordingFinished = () => {
		stopLoopRecording();
		dispatch({type: 'RECORDING_ENDED'})
	}

	const stopLoopRecording = () => {
		stopRecording();
		stopPlayback();
	}

	const setTimer = (duration) => {
		const time = new Date();
		time.setSeconds(time.getSeconds() + duration);  
		setExpiryTimestamp(time, true);
		console.log('timer started for ' + duration + ' seconds');
		console.log('timer will expire at ' + time.toString());
	}

	const startLoopRecording = () => {
		const secPerBeat = 1 / (bpm / 60);
		const duration = numBars * beatsPerBar * secPerBeat;
		setTimer(duration);  
		startRecording();
		console.log('Recording started for ' + duration.toString() + ' seconds');
	}

	const stopPlayback = () => {
		audioSource?.stop();
	}

  const handleStartRecording = (numBars) => {
		if (state.recording || state.countingDown || state.playingAudio) {
			return;
		}

		if (status === 'permission_denied') {
			console.log('Permission denied');
			return;
		}
		setNumBars(numBars);
		startCountdown();
		dispatch({type: 'COUNTDOWN_STARTED'});
  }

	return (
		<div style={controlPanelStyle}>
			{state.recording ? <Timer onExpire={onRecordingFinished} expiryTimestamp={expiryTimestamp} /> : undefined}
			{state.countingDown ? <Timer onExpire={onCountdownFinished} expiryTimestamp={expiryTimestamp} /> : undefined}
			<RecordButton 
				audioContext={audioContext} 
				onClick={handleStartRecording} 
				isPlaying={isPlaying}
				stopPlayback={stopPlayback}
				stopRecording={stopLoopRecording} />
			<SaveButton mediaBlobUrls={mediaBlobUrls} />
			<LoopControlRow initializeRecording={numBars => handleStartRecording(numBars)} />
		</div>
	);
};

export default ControlPanel;
