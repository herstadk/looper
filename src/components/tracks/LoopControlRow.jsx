import React from 'react';
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

const LoopControlRow = () => {

  return (
    <div style={rowContainerStyle}>
      <div style={rowStyle}>
        <StartLoopButton />
        <StartLoopButton />
        <StartLoopButton />
        <StartLoopButton />
        <StartLoopButton />
      </div>
    </div>
  );
}

export default LoopControlRow;
