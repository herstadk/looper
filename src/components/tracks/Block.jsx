import React from 'react';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';

const blockStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  borderRadius: '2px',
  zIndex: 0,
  opacity: 0.7,
};

const Block = (props) => {
  const { state, onCountdownFinished, loopIndex, color, inProgress } = props;
  return (
    <div style={{ ...blockStyle, backgroundColor: color }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {inProgress && loopIndex === 0 ? (
          <CountdownTimer
            expiryTimestamp={state.expiryTimestamp}
            onExpire={onCountdownFinished}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default Block;
