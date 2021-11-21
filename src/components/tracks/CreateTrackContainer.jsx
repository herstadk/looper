import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import PlayContainer from './PlayContainer';
import { getAllBlobs } from '../../utils/blobs';
import { useReactMediaRecorder } from 'react-media-recorder';
import Timer from './Timer';

const containerStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexFlow: 'column',
	justifyContent: 'center',
	alignItems: 'center'
};

const initialState = {
	initiatingCountdown: false,
	recording: false,
	countingDown: false,
	playingAudio: false,
	expiryTimestamp: undefined
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'RECORDING_STARTED':
			console.log('recording started');
			return {...state, recording: true, playingAudio: true, countingDown: false, expiryTimestamp: action.payload.expiryTimestamp};
		case 'RECORDING_ENDED':
			console.log('recording ended');
			return {...state, recording: false, playingAudio: false, expiryTimestamp: undefined};
		case 'COUNTDOWN_STARTED':
			console.log('countdown started');
			return {...state, countingDown: true, expiryTimestamp: action.payload.expiryTimestamp};
		case 'COUNTDOWN_ENDED':
			console.log('countdown ended');
			return {...state, countingDown: false, expiryTimestamp: undefined};
		default:
			return initialState;
	}
}

const CreateTrackContainer = (props) => {
	const { audioContext } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const [mediaBlobUrls, setMediaBlobUrls] = useState([]);
	const [audioBuffers, setAudioBuffers] = useState([]);
	const [audioSource, setAudioSource] = useState(null);
	const bpm = 120;
	const beatsPerBar = 4;
	const [numBars, setNumBars ] = useState(undefined);
	const { status, startRecording, stopRecording } = useReactMediaRecorder({
		video: false,
		audio: true,
		blobOptions: { type: 'audio/mpeg' },
		onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
	});

	const loadAudioBuffer = useCallback((mediaBlobUrl) => {
		const request = new XMLHttpRequest();
		request.open("GET", mediaBlobUrl);
		request.responseType = "arraybuffer";
		request.onload = () => {
			const undecodedAudio = request.response;
			audioContext.decodeAudioData(undecodedAudio, (audioBuffer) => addAudioBuffer(audioBuffer));
		};

		request.send();
	}, [audioContext])

	// const loadFetchedAudioBuffers = useCallback((allBlobs) => {
	// 	for (const blob of allBlobs) {
	// 		loadAudioBuffer(blob.mediaBlobUrl);
	// 	}
	// }, [loadAudioBuffer])

	// useEffect(() => {
	// 	/**
	// 	 * 
	// 	 * 
	// 	 * Testing get requests from azure
	// 	 * 
	// 	 * 
	// 	 */
	// 	async function myfunc() {
	// 		let allBlobs = await getAllBlobs();
	// 		loadFetchedAudioBuffers(allBlobs);
	// 		setMediaBlobUrls([...allBlobs]);
	// 	}
	// 	myfunc();
	// 	/**
	// 	 * 
	// 	 * 
	// 	 * 
	// 	 * End testing get requests
	// 	 * 
	// 	 * 
	// 	 * 
	// 	 */
	// }, [loadFetchedAudioBuffers]);

	const addMediaBlobUrl = (newMediaBlobUrl) => {
		newMediaBlobUrl.saved = false;
		setMediaBlobUrls((curMediaBlobUrls) => [
			...curMediaBlobUrls,
			newMediaBlobUrl,
		]);
		loadAudioBuffer(newMediaBlobUrl.mediaBlobUrl);
	};

	const addAudioBuffer = (newAudioBuffer) => {
		setAudioBuffers((curAudioBuffers) => [
			...curAudioBuffers,
			newAudioBuffer,
		]);
	};

	const playAudio = () => {
		if (mediaBlobUrls.length === 0) {
			return;		// don't attempt to play without any audio elements loaded
		}
		if (audioSource) {
			audioSource.disconnect();
			setAudioSource(null);
		}
		const source = audioContext.createBufferSource()
		setAudioSource(source);
		source.connect(audioContext.destination);
		source.buffer = mixAudioBuffers(audioBuffers);
		// source.addEventListener('ended', () => setIsPlaying(false));
		audioContext.resume();
		// setIsPlaying(true);
		source.start();
	};

	const mixAudioBuffers = (audioBuffers) => {
		const numChannels = getMinNumChannels(audioBuffers);
		const length = getMaxTrackLength(audioBuffers);
		const mix = audioContext.createBuffer(numChannels, length, audioContext.sampleRate);
		for (const audioBuffer of audioBuffers) {
			// Mix sound channels seperately
			for (let channel = 0; channel < numChannels; channel++) {
				const mixChannelBuffer = mix.getChannelData(channel);
				const audioChannelBuffer = audioBuffer.getChannelData(channel);
				let totalBytes = 0;
				// Loop all but the longest track
				while (totalBytes < length) {
					// Sum audio byte by byte
					for (let byte = 0; byte < audioBuffer.length; byte++) {
						mixChannelBuffer[totalBytes] += audioChannelBuffer[byte];
						totalBytes += 1;
					}
				}
			}
		}

		return mix;
	}

	const getMinNumChannels = (audioBuffers) => {
		return Math.min(...audioBuffers.map(x => x.numberOfChannels));
	}

	const getMaxTrackLength = (audioBuffers) => {
		return Math.max(...audioBuffers.map(x => x.length));
	}

	const startCountdown = () => {
		const time = setTimer(3);
		return time;
	}

	const onCountdownFinished = () => {
		const time = startLoopRecording();
		playAudio();
		dispatch({type: 'RECORDING_STARTED', payload: {expiryTimestamp: time}});
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
		return time;
	}

	const startLoopRecording = () => {
		const secPerBeat = 1 / (bpm / 60);
		const duration = numBars * beatsPerBar * secPerBeat;
		const time = setTimer(duration);  
		startRecording();
		return time;
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
		const time = startCountdown();
		dispatch({type: 'COUNTDOWN_STARTED', payload: {expiryTimestamp: time}});
  }

	return (
		<div style={containerStyle}>
			{state.recording ? <Timer onExpire={onRecordingFinished} expiryTimestamp={state.expiryTimestamp} /> : undefined}
			<ControlPanel
				mediaBlobUrls={mediaBlobUrls}
				handleStartRecording={handleStartRecording}
			/>
			<PlayContainer tracks={audioBuffers} state={state} onCountdownFinished={onCountdownFinished} />
		</div>
	);
};

export default CreateTrackContainer;
