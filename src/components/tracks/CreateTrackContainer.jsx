import React from 'react';
import ControlPanel from './ControlPanel';
import { Colors } from '../../styles/colors';

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexFlow: 'column',
};

const CreateTrackContainer = () => {
  return (
    <div style={containerStyle}>
      <ControlPanel />
      <div
        style={{
          color: Colors.white,
          fontSize: 64,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Create Track
      </div>
    </div>
  );
};

export default CreateTrackContainer;
