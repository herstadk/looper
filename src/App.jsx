import React from 'react';
import CreateTrackContainer from './components/tracks/CreateTrackContainer';
import EditTrackContainer from './components/tracks/EditTrackContainer';
import { Colors } from './styles/colors';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const style = {
	display: 'flex',
	height: '100vh',
	width: '100%',
	backgroundColor: Colors.charcoal,
};

// global audio context variable to pass down to components
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const App = () => {
	return (
		<Router>
		<div style={style} data-testid={'base-container'}>
			<Switch>
			<Route exact path="/">
				<CreateTrackContainer audioContext={audioContext} />
			</Route>
			<Route exact path="/edit">
				<EditTrackContainer />
			</Route>
			</Switch>
		</div>
		</Router>
	);
};

export default App;
