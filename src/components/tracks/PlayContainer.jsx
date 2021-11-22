import React from 'react';
import BlockContainer from './BlockContainer';
import PlayDropdown from './PlayDropDown';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const PlayContainer = (props) => {
  const { tracks, state, onCountdownFinished, duration, getAudioSelection } = props;

  const [chosenFile, setFileData] = useState(null);

  const childToParent = (childData) => {
      
      setFileData(childData);
      console.log("Play container has blob:", childData);
  }

  return (
    <div style={containerStyle}>
      <BlockContainer
        tracks={tracks}
        state={state}
        onCountdownFinished={onCountdownFinished}
        duration={duration}
      />
      <PlayDropdown addMediaBlobUrl = {addMediaBlobUrl} childToParent={childToParent} />
    {getAudioSelection(chosenFile)}
    </div>
  );
};

export default PlayContainer;