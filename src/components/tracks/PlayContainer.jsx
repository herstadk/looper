import React from 'react';
import BlockContainer from './BlockContainer';


const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'columns',
};

const PlayContainer = (props) => {
  const {
    audioSettings,
    tracks,
    state,
    onCountdownFinished,
    duration,
  } = props;

  return (
    <div className="container-blockContainer" style={containerStyle}>
      <BlockContainer
        audioSettings={audioSettings}
        tracks={tracks}
        state={state}
        onCountdownFinished={onCountdownFinished}
        duration={duration}
      />
    </div>
  );
};

export default PlayContainer;
