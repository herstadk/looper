import React, { useState, useEffect } from 'react';
import { Colors } from '../../styles/colors';
import * as Tone from 'tone';

const PlayheadStyle = {
  width: '2px',
  zIndex: 1, // Render on top of blocks
  backgroundColor: Colors.white,
  position: 'relative',
  opacity: 1,
};

const Playhead = (props) => {
  const { height } = props;
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

export default Playhead;
