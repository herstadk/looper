import React from 'react';
import Block from './Block';
import { getSecPerBeat } from '../../utils/audio';

const rowStyle = {
  display: 'flex',
  width: '100%',
  gap: 2,
  height: '100px',
  overflow: 'hidden',
};

const BlockRow = (props) => {
  const { audioSettings, color, inProgress, state, track, onCountdownFinished } = props;
  const { bpm, beatsPerBar, maxBarsPerLoop } = audioSettings;
  const maxDuration = maxBarsPerLoop * beatsPerBar * getSecPerBeat(bpm);
  const numLoops = Math.max(1, Math.round(maxDuration / track.duration));
  const totalWaveformDivisions = 300;
  const divisionsPerLoop = Math.floor(totalWaveformDivisions / numLoops);
  return (
    <div style={rowStyle}>
      {[...Array(numLoops)].map((_, idx) => {
        return (
          <Block
            waveformDivisions={divisionsPerLoop}
            track={track}
            state={state}
            onCountdownFinished={onCountdownFinished}
            inProgress={inProgress}
            color={color}
            loopIndex={idx}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default BlockRow;
