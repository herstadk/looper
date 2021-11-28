import React from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import { IconContext } from 'react-icons';
import { BsRecordFill } from 'react-icons/bs';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import RecordingIndicator from './RecordingIndicator';

const controlPanelStyle = {
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: Colors.black,
  alignItems: 'center',
  justifyContent: 'center',
};

const ControlPanel = (props) => {
  const {
    state,
    startPlayback,
    stopPlayback,
    mediaBlobUrls,
    handleStartRecording,
  } = props;

  return (
    <div style={controlPanelStyle}>
      {state.recording || state.playingAudio ? (
        <StopButton onClick={stopPlayback} />
      ) : (
        <PlayButton onClick={startPlayback} />
      )}
      {/* <SaveButton mediaBlobUrls={mediaBlobUrls} /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '80%',
          width: '70%',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: Colors.green,
            justifyContent: 'space-around',
            alignItems: 'center',
            fontSize: 20,
          }}
        >
          <div>base loop size: 4</div>
          <div>bpm: 120</div>
        </div>
        <LoopControlRow initializeRecording={handleStartRecording} />
      </div>
      <RecordingIndicator recording={state.recording} />
      {/* <IconContext.Provider
        value={{ color: Colors.red, size: 100, boxShadow: '0 0 3px #ff2200' }}
      >
        <BsRecordFill />
      </IconContext.Provider> */}
    </div>
  );
};

export default ControlPanel;
