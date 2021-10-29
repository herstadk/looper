import React from 'react';
import ControlPanel from './ControlPanel';
import { Colors } from '../../styles/colors';
import PlayContainer from './PlayContainer';

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexFlow: 'column',
};

const CreateTrackContainer = ({title}) => {
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
        {title}
      </div>
      <PlayContainer />
    </div>
  );
};

CreateTrackContainer.defaultProps = {
  title: 'Create Track',
}

export default CreateTrackContainer;
