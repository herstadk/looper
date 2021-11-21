import React from 'react';
import BlockContainer from './BlockContainer';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const PlayContainer = (props) => {
  const { tracks, state, onCountdownFinished, duration } = props;

  return (
    <div style={containerStyle}>
      <BlockContainer
        tracks={tracks}
        state={state}
        onCountdownFinished={onCountdownFinished}
        duration={duration}
      />
    </div>
  );
};

export default PlayContainer;
