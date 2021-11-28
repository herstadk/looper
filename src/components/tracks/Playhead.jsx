import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Colors } from '../../styles/colors';
import * as Tone from 'tone';

const PlayheadStyle = {
  width: '2px',
  zIndex: 1, // Render on top of blocks
  backgroundColor: Colors.white,
  position: 'relative',
  opacity: 1,
};

const ProgressBar = (props) => {
  const { state, showProgress, height, width, duration } = props;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setProgress(Tone.Transport.progress);
    }, 64);
  }, []);

  return (
    <div
      style={{
        ...PlayheadStyle,
        left: `${progress * 100}%`,
        height: height,
      }}
    ></div>
  );
};

export default ProgressBar;
