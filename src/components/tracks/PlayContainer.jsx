import React from 'react';
import BlockContainer from './BlockContainer';
import PlayDropdown from './PlayDropDown';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
};

const PlayContainer = (props) => {
  const {
    audioSettings,
    tracks,
    state,
    onCountdownFinished,
    duration,
    setAudioSelection,
  } = props;

  return (
    <div style={containerStyle}>
      <BlockContainer
        audioSettings={audioSettings}
        tracks={tracks}
        state={state}
        onCountdownFinished={onCountdownFinished}
        duration={duration}
      />
      <PlayDropdown setAudioSelection={setAudioSelection} />
    </div>
  );
};

export default PlayContainer;
