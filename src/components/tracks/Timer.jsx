import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = (props) => {
  const { onExpire, expiryTimestamp } = props;
  useTimer({onExpire: onExpire, expiryTimestamp: expiryTimestamp})

  return <></>
}

export default Timer;