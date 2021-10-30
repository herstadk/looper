import React, { useState } from 'react';
import ControlPanel from './ControlPanel';
import { Colors } from '../../styles/colors';
import PlayContainer from './PlayContainer';

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexFlow: 'column',
};

const CreateTrackContainer = ({ title }) => {
  const [mediaBlobUrls, setMediaBlobUrls] = useState([]);

  const addMediaBlobUrl = (newMediaBlobUrl) => {
    setMediaBlobUrls((curMediaBlobUrls) => [
      ...curMediaBlobUrls,
      newMediaBlobUrl,
    ]);
  };

  // Note: audio elements are included here for proof of concept only
  return (
    <div style={containerStyle}>
      {mediaBlobUrls.map((mediaBlobUrl, idx) => (
        <audio src={mediaBlobUrl} key={idx} controls />
      ))}
      <ControlPanel addMediaBlobUrl={addMediaBlobUrl} />
      <div
        style={{
          color: Colors.white,
          fontSize: 64,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {title}
      </div>
      <PlayContainer />
    </div>
  );
};

CreateTrackContainer.defaultProps = {
  title: 'Create Track',
};

export default CreateTrackContainer;
