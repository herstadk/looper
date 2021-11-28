import React from 'react';
import { IconContext } from 'react-icons';
import { FaStop } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const buttonStyle = {
  cursor: 'pointer',
  color: Colors.green,
  size: 100,
};

const StopButton = (props) => {
  const { onClick } = props;

  return (
    <IconContext.Provider value={buttonStyle}>
      <FaStop style={buttonStyle} onClick={onClick} />
    </IconContext.Provider>
  );
};

export default StopButton;
