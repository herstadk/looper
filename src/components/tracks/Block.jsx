import React, { useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import WaveformSection from './WaveformSection';

const blockStyle = {
  display: 'block',
  flex: '1 1 100%',
  height: '100%',
  borderRadius: '4px',
  zIndex: 0,
  opacity: 0.7,
  overflow: 'hidden',
};

const Block = (props) => {
  const {
    waveformDivisions,
    state,
    onCountdownFinished,
    loopIndex,
    track,
    color,
    inProgress,
  } = props;
  const [waveform, setWaveform] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [min, setMin] = useState(undefined);

  useEffect(() => {
    if (!track) return;
    const numBuckets = waveformDivisions;
    const bucketSize = Math.floor(track.length / numBuckets);
    const buckets = [];
    const channelData = track.getChannelData(0);
    for (let i = 0; i < numBuckets; i++) {
      const start = i * bucketSize;
      const end = start + bucketSize;
      const avg =
        channelData.slice(start, end).reduce((a, b) => a + b) / bucketSize;
      buckets.push(avg);
    }
    setWaveform(buckets);
    setMax(Math.max(...buckets));
    setMin(Math.min(...buckets));
  }, [track, waveformDivisions]);

  const getHeight = (val) => {
    const adjustedMax = Math.max(Math.abs(min), Math.abs(max));
    return ((100 * Math.abs(val)) / adjustedMax).toString() + '%';
  };

  return (
    <div style={{ ...blockStyle, backgroundColor: color }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {inProgress && loopIndex === 0 ? (
          <CountdownTimer
            expiryTimestamp={state.expiryTimestamp}
            onExpire={onCountdownFinished}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              gap: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {waveform?.map((bucket, idx) => (
              <WaveformSection height={getHeight(bucket)} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Block;
