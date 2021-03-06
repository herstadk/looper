import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlay } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const buttonStyle = {
  cursor: 'pointer',
  color: Colors.green,
  size: 100,
};

const PlayButton = (props) => {
  const { onClick } = props;
  return (
    <IconContext.Provider value={buttonStyle}>
      <FaPlay style={buttonStyle} onClick={onClick} />
    </IconContext.Provider>
  );
};

export default PlayButton;
