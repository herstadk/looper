import React, { useState, useEffect, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import PlayContainer from './PlayContainer';
import { getAllBlobs } from '../../utils/blobs';

const containerStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexFlow: 'column',
	justifyContent: 'center',
	alignItems: 'center'
};

const CreateTrackContainer = ({ title, audioContext }) => {
	const [mediaBlobUrls, setMediaBlobUrls] = useState([]);
	const [audioBuffers, setAudioBuffers] = useState([]);
	const [audioSource, setAudioSource] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

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

	const loadFetchedAudioBuffers = useCallback((allBlobs) => {
		for (const blob of allBlobs) {
			loadAudioBuffer(blob.mediaBlobUrl);
		}
	}, [loadAudioBuffer])

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
		source.addEventListener('ended', () => setIsPlaying(false));
		audioContext.resume();
		setIsPlaying(true);
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

	return (
		<div style={containerStyle}>
			<ControlPanel
				audioContext={audioContext}
				addMediaBlobUrl={addMediaBlobUrl}
				mediaBlobUrls={mediaBlobUrls}
				playAudio={playAudio}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				audioSource={audioSource} 
			/>
			<PlayContainer tracks={audioBuffers}/>
		</div>
	);
};

export default CreateTrackContainer;
