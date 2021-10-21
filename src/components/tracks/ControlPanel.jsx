import React from 'react';
import { Colors } from '../../styles/colors';

const controlPanelStyle = {
  display: 'flex',
  width: '100%',
  height: '200px',
  backgroundColor: Colors.black,
};

const ControlPanel = () => {
  return <div style={controlPanelStyle}></div>;
};

export default ControlPanel;
