import React from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import RecordButton from './RecordButton';
import LoadButton from '../load/LoadButton';


const controlPanelStyle = {
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: Colors.black,
  alignItems: 'center',
};

const ControlPanel = (props) => {
  const {
    state,
    stopPlayback,
    stopRecording,
    mediaBlobUrls,
    handleStartRecording,
  } = props;

  return (
    <div style={controlPanelStyle}>
      <RecordButton
        state={state}
        onClick={handleStartRecording}
        stopPlayback={stopPlayback}
        stopRecording={stopRecording}
      />
      <SaveButton mediaBlobUrls={mediaBlobUrls} />
      <LoadButton />
      <LoopControlRow
        initializeRecording={(numBars) => handleStartRecording(numBars)}
      />
    </div>
  );
};

export default ControlPanel;
