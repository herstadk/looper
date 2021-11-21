import React from 'react';
import ProgressBar from './ProgressBar';

const blockStyle = {
  display: 'flex',
  width: '100%', 
  height: '100%',

  borderRadius: '5px',
  opacity: 0.7 
}

const Block = (props) => {
  const { color, progress } = props;
  return (
    <div style={{...blockStyle, backgroundColor: color}}>
      <ProgressBar progress={progress}/>
    </div>
  );
}

export default Block;