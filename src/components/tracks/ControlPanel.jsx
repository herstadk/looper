import React from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordButton from './RecordButton';
import { useTimer } from 'react-timer-hook';

const controlPanelStyle = {
	display: 'flex',
	width: '100%',
	height: '200px',
	backgroundColor: Colors.black,
	alignItems: 'center',
};

const ControlPanel = (props) => {
	const { audioContext, addMediaBlobUrl, mediaBlobUrls, playAudio, isPlaying, /*setIsPlaying,*/ audioSource } = props;
	const { restart } = useTimer({onExpire: () => stopLoopRecording()})
	const duration = 5;
	const { status, startRecording, stopRecording } = useReactMediaRecorder({
		video: false,
		audio: true,
		blobOptions: { type: 'audio/mpeg' },
		onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
	});

	const stopLoopRecording = () => {
		stopRecording();
		console.log('Recording finished');
	}

	const startLoopRecording = () => {
		const time = new Date();
		time.setSeconds(time.getSeconds() + duration);  
		startRecording();
		restart(time);
		console.log('Recording started');
	}

	const startPlackback = () => {
		playAudio();
	}

	const stopPlayback = () => {
		audioSource.stop();
	}

  const handleRecordingStart = () => {
		if (status === 'idle' || status === 'stopped') {
			handlePlaybackStart();
			startLoopRecording();
		} else if (status === 'permission_denied') {
			console.log('Permission denied');
		} else {
			console.log('Something went wrong');
		}
  }

	const handlePlaybackStart = () => {
		if (status === 'recording') {
			return;
		}
		if (isPlaying) {
			stopPlayback();
		} else {
			startPlackback();
		}
	}

	return (
		<div style={controlPanelStyle}>
			<RecordButton audioContext={audioContext} 
						  onClick={handleRecordingStart} 
						  isPlaying={isPlaying}
						  stopPlayback={stopPlayback}
						  stopRecording={stopLoopRecording} />
			<SaveButton mediaBlobUrls={mediaBlobUrls} />
			<LoopControlRow />
		</div>
	);
};

export default ControlPanel;
