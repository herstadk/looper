import React from 'react';
import { Colors } from '../../styles/colors';

const ProgressBar = (props) => {
  const { progress } = props;
  const progressBarStyle = {
    display: progress !== undefined ? 'flex' : 'none',
    left: progress !== undefined ? (progress * 100).toString() + '%' : '0%',
    height: '100%', 
    width: '2px', 
    backgroundColor: Colors.white, 
    position: 'relative', 
    opacity: 1
  }

  return (
    <div style={progressBarStyle}>

    </div>
  );
}

export default ProgressBar;