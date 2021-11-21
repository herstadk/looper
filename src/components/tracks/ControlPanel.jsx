import React, { useEffect } from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import RecordButton from './RecordButton';

const controlPanelStyle = {
	display: 'flex',
	width: '100%',
	height: '200px',
	backgroundColor: Colors.black,
	alignItems: 'center',
};

const ControlPanel = (props) => {
	const { mediaBlobUrls, handleStartRecording } = props;

	return (
		<div style={controlPanelStyle}>
			{/* <RecordButton 
				audioContext={audioContext} 
				onClick={handleStartRecording} 
				isPlaying={isPlaying}
				stopPlayback={stopPlayback}
				stopRecording={stopLoopRecording} /> */}
			<SaveButton mediaBlobUrls={mediaBlobUrls} />
			<LoopControlRow initializeRecording={numBars => handleStartRecording(numBars)} />
		</div>
	);
};

export default ControlPanel;
