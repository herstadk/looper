import React, { useState } from 'react';
import StartLoopButton from './StartLoopButton';

const rowContainerStyle = {
  display: 'flex', 
  flexDirection: 'column-reverse', 
  width: '100%', 
  height: '80%'
}

const rowStyle = {
  display: 'flex', 
  width: '100%', 
  flexDirection: 'row', 
  justifyContent: 'space-around', 
}

const LoopControlRow = (props) => {
  const { initializeRecording } = props;
  const barCountOptions = [1, 2, 4, 8];

  return (
    <div style={rowContainerStyle}>
      <div style={rowStyle}>
        {barCountOptions.map(bco => <StartLoopButton number={bco} onClick={() => initializeRecording(bco)} key={bco} />)}
      </div>
    </div>
  );
}

export default LoopControlRow;
