import React from 'react';
import { IconContext } from 'react-icons';
import { BsRecordFill } from 'react-icons/bs';
import { Colors } from '../../styles/colors';
import './RecordingIndicator.css';

const iconStyle = {
  size: 100,
  color: Colors.red,
};

const RecordingIndicator = (props) => {
  const { recording } = props;
  return (
    <div className={'recording-indicator'}>
      <IconContext.Provider value={iconStyle}>
        <BsRecordFill style={{ opacity: !recording ? 0 : undefined }} />
      </IconContext.Provider>
    </div>
  );
};

export default RecordingIndicator;
