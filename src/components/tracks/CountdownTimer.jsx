import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Colors } from '../../styles/colors';

const CountdownTimer = (props) => {
  const { onExpire, expiryTimestamp } = props;
  const { seconds } = useTimer({
    onExpire: onExpire,
    expiryTimestamp: expiryTimestamp,
  });
  return (
    <div
      style={{
        display: 'flex',
        fontSize: 80,
        color: Colors.white,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {seconds > 0 ? seconds : undefined}
    </div>
  );
};

export default CountdownTimer;
