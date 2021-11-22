import React from 'react';
import { Colors } from '../../styles/colors';

const outerCircleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '60px',
  borderRadius: '50%',
  backgroundColor: Colors.green,
  cursor: 'pointer'
}

const innerCircleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '52px',
  width: '52px',
  borderRadius: '50%',
  fontSize: 40,
  color: Colors.green,
  backgroundColor: Colors.black
}

const StartLoopButton = (props) => {
  const { onClick, number } = props;
  return (
    <div style={outerCircleStyle} onClick={onClick}>
      <div style={innerCircleStyle}>{number}</div>
    </div>
  );
}

export default StartLoopButton;