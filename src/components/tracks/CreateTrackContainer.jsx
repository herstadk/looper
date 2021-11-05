import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import { Colors } from '../../styles/colors';
import PlayContainer from './PlayContainer';
import { getAllBlobs } from '../../utils/blobs';

const containerStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexFlow: 'column',
};

const titleDivStyle = {
	color: Colors.white,
	fontSize: 64,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
};

const CreateTrackContainer = ({ title, audioContext }) => {
	const [mediaBlobUrls, setMediaBlobUrls] = useState([]);

	const addMediaBlobUrl = (newMediaBlobUrl) => {
		newMediaBlobUrl.saved = false;

		setMediaBlobUrls((curMediaBlobUrls) => [
			...curMediaBlobUrls,
			newMediaBlobUrl,
		]);
	};

	useEffect(() => {
		/**
		 * 
		 * 
		 * Testing get requests from azure
		 * 
		 * 
		 */
		async function myfunc() {
			let allBlobs = await getAllBlobs();
			setMediaBlobUrls([...allBlobs]);
		}
		myfunc();
		/**
		 * 
		 * 
		 * 
		 * End testing get requests
		 * 
		 * 
		 * 
		 */
	}, []);

	// add all loaded audio elements into the audio context
	useEffect(() => {
		const audioElement = document.getElementById('audio-1');

		if (audioElement !== null) {
			const track = audioContext.createMediaElementSource(audioElement);
			track.connect(audioContext.destination);
			
			console.log("Adding event listener!!!!!!!!!!!!!!");
			document.getElementById('play-button').addEventListener('click', (e) => {
				if (e.currentTarget.dataset.playing === 'false') {
					audioElement.play();
					e.currentTarget.dataset.playing = 'true';
				} else if (e.currentTarget.dataset.playing == 'true') {
					audioElement.pause();
					e.currentTarget.dataset.playing = 'false';
				}
			});

			audioElement.addEventListener('ended', (e) => {
				document.getElementById('play-button').dataset.playing = 'false';
			});
		}
	}, [mediaBlobUrls]);

	// Note: audio elements are included here for proof of concept only
	return (
		<div style={containerStyle}>
			{mediaBlobUrls.map((mediaBlobUrl, idx) => {
				return <audio src={mediaBlobUrl.mediaBlobUrl} key={idx} id={"audio-" + idx} controls />
			})}
			<ControlPanel addMediaBlobUrl={addMediaBlobUrl} mediaBlobUrls={mediaBlobUrls} />
			<div style={titleDivStyle}>{title}</div>
			<PlayContainer />
		</div>
	);
};

CreateTrackContainer.defaultProps = {
	title: 'Create Track',
};

export default CreateTrackContainer;
