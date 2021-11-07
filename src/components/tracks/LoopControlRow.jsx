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

const LoopControlRow = (props) => {
  const { handleLoopStart } = props;

  return (
    <div style={rowContainerStyle}>
      <div style={rowStyle}>
        <StartLoopButton onClick={handleLoopStart} />
        <StartLoopButton onClick={handleLoopStart} />
        <StartLoopButton onClick={handleLoopStart} />
        <StartLoopButton onClick={handleLoopStart} />
        <StartLoopButton onClick={handleLoopStart} />
      </div>
    </div>
  );
}

export default LoopControlRow;
