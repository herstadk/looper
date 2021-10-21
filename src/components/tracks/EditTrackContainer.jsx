import React from 'react';
import { Colors } from '../../styles/colors';

const containerStyle = {
  display: 'flex',
  height: '100%',
  width: '100%',
  color: Colors.white,
};

const EditTrackContainer = () => {
  return (
    <div style={containerStyle}>
      <div
        style={{
          color: Colors.white,
          fontSize: 64,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Edit Track
      </div>
    </div>
  );
};

export default EditTrackContainer;
