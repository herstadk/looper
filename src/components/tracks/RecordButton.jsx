import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlay, FaStop } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const buttonStyle = {
  cursor: 'pointer',
};

const RecordButton = (props) => {
  const { onClick, isRecording } = props;
  return (
    <IconContext.Provider value={{ color: Colors.green, size: 100 }}>
      {isRecording ? (
        <FaStop onClick={() => onClick()} style={buttonStyle} />
      ) : (
        <FaPlay onClick={() => onClick()} style={buttonStyle} />
      )}
    </IconContext.Provider>
  );
};

export default RecordButton;
