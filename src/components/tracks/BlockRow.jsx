import React from 'react';
import Block from './Block';

const rowStyle = {
  display: 'flex',
  width: '100%',
  height: '20%',
  borderRadius: '5px',
  overflow: 'hidden',
}

const BlockRow = (props) => {
  const { color, inProgress, state, onCountdownFinished } = props;
  const loops = [1];
  return (
    <div style={rowStyle}>
      {loops.map((loop, idx) => {
        
        return <Block
          state={state} 
          onCountdownFinished={onCountdownFinished} 
          inProgress={inProgress} 
          color={color} 
          loopIndex={idx} 
          key={idx} 
          progress={0} 
        />
      })}
    </div>
  );
}

export default BlockRow;