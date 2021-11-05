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

const CreateTrackContainer = ({ title }) => {
	const [mediaBlobUrls, setMediaBlobUrls] = useState([]);

	const addMediaBlobUrl = (newMediaBlobUrl) => {
		newMediaBlobUrl.saved = false;

		setMediaBlobUrls((curMediaBlobUrls) => [
			...curMediaBlobUrls,
			newMediaBlobUrl,
		]);
	};

	/**
	 * 
	 * 
	 * Testing get requests from azure
	 * 
	 * 
	 */

	useEffect(() => {

		async function myfunc() {
			let allBlobs = await getAllBlobs();
			setMediaBlobUrls([...allBlobs]);
		}

		myfunc();
		
	}, []);

	/**
	 * 
	 * 
	 * 
	 * End testing get requests
	 * 
	 * 
	 * 
	 */

	// Note: audio elements are included here for proof of concept only
	return (
		<div style={containerStyle}>
			{mediaBlobUrls.map((mediaBlobUrl, idx) => {
				return <audio src={mediaBlobUrl.mediaBlobUrl} key={idx} controls />
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
