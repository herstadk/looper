import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Colors } from '../../styles/colors';

const progressBarStyle = {
  left: '0%',
  width: '2px',
  zIndex: 1, // Render on top of blocks
  backgroundColor: Colors.white,
  position: 'relative',
  opacity: 1,
};

const ProgressBar = (props) => {
  const { state, showProgress, height, width, duration } = props;
  const [transform, setTransform] = useState(undefined);
  const [transition, setTransition] = useState(undefined);
  useEffect(() => {
    if (state.recording) {
      console.log(duration);
      setTransform(`translateX(${width}px)`);
      setTransition(`transform ${duration}s linear`);
    } else {
      setTransform(undefined);
      setTransition('transform 0s linear');
    }
  }, [state]);

  return (
    <div
      style={{
        ...progressBarStyle,
        animationPlayState: state.recording ? 'running' : 'paused',
        display: showProgress !== undefined ? 'flex' : 'none',
        height: height,
        transform: transform,
        transition: transition,
      }}
    ></div>
  );
};

export default ProgressBar;
