import React from 'react';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';

const blockStyle = {
  display: 'flex',
  width: '100%', 
  height: '100%',
  borderRadius: '5px',
  opacity: 0.7 
}

const Block = (props) => {
  const { state, onCountdownFinished, loopIndex, color, progress, inProgress } = props;
  return (
    <div style={{...blockStyle, backgroundColor: color}}>
      <ProgressBar progress={progress}/>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        {inProgress && loopIndex === 0 ? <CountdownTimer expiryTimestamp={state.expiryTimestamp} onExpire={onCountdownFinished} /> : undefined}
      </div>
    </div>
  );
}

export default Block;