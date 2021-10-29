import React from 'react';
import Recorder from './Recorder';
import { Colors } from '../../styles/colors';

const controlPanelStyle = {
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: Colors.black,
  alignItems: 'center',
};

const ControlPanel = (props) => {
  const { addMediaBlobUrl } = props;
  return (
    <div style={controlPanelStyle}>
      <Recorder addMediaBlobUrl={addMediaBlobUrl} />
    </div>
  );
};

export default ControlPanel;
