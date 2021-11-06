import React from 'react';
import { IconContext } from 'react-icons';
import { FaCircleNotch } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const startLoopButtonStyle = {
  color: Colors.green,
  size: 60,
}

const StartLoopButton = (props) => {
  const { onClick } = props;
  return (
    <IconContext.Provider value={startLoopButtonStyle}>
      <FaCircleNotch onClick={() => onClick()} style={{cursor: 'pointer'}}/>
    </IconContext.Provider>
  );
}

export default StartLoopButton;