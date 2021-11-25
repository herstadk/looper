import React from 'react';
import SaveButton from '../save/SaveButton';
import { Colors } from '../../styles/colors';
import LoopControlRow from './LoopControlRow';
import RecordButton from './RecordButton';
import { IconContext } from 'react-icons';
import { FaPlay, FaStop } from 'react-icons/fa';
import {BsRecordFill} from 'react-icons/bs'

const controlPanelStyle = {
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: Colors.black,
  alignItems: 'center',
  justifyContent: 'center'
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
      {/* <SaveButton mediaBlobUrls={mediaBlobUrls} /> */}
      <div style={{display: 'flex', flexDirection: 'column', height: '80%', width: '70%'}}>
        <div style={{display: 'flex', color: Colors.green, justifyContent: 'space-around', alignItems: 'center', fontSize: 20}}>
          <div>
            base loop size: 4
          </div>
          <div>
            bpm: 120
          </div>
        </div>
        <LoopControlRow
          initializeRecording={(numBars) => handleStartRecording(numBars)}
        />
      </div>
      <IconContext.Provider value={{ color: Colors.red, size: 100, boxShadow: '0 0 3px #ff2200'}}>
        <BsRecordFill />
			</IconContext.Provider>
    </div>
  );
};

export default ControlPanel;
