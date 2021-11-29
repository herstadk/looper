import React from 'react';
import { Colors } from '../../styles/colors';

const WaveformSection = (props) => {
  const { height } = props;
  return (
    <div
      style={{
        display: 'flex',
        height: height,
        backgroundColor: Colors.white,
        flex: '0 0 0.2%',
      }}
    ></div>
  );
};

export default WaveformSection;
