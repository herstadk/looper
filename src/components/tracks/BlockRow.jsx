import React from 'react';
import { Colors } from '../../styles/colors';
import Block from './Block';

const rowStyle = {
  display: 'flex',
  width: '1200px',
  height: '100px',
  borderRadius: '2px',
  overflow: 'hidden',
};

const BlockRow = (props) => {
  const { color, inProgress, state, onCountdownFinished } = props;
  const loops = [1];
  return (
    <div style={rowStyle}>
      {loops.map((loop, idx) => {
        return (
          <Block
            state={state}
            onCountdownFinished={onCountdownFinished}
            inProgress={inProgress}
            color={color}
            loopIndex={idx}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default BlockRow;
