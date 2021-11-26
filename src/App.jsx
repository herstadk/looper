import React from 'react';
import CreateTrackContainer from './components/tracks/CreateTrackContainer';
import { Colors } from './styles/colors';


const playerStyle = {
	display: 'flex',
	height: '100vh',
	width: '100%',
	backgroundColor: Colors.charcoal,
	float: 'left'
};

// global audio context variable to pass down to components
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const App = () => {
	return (
	<>
		<div style={playerStyle} data-testid={'base-container'}>
			<CreateTrackContainer audioContext={audioContext} />
		</div>
	</>
	);
};


export default App;