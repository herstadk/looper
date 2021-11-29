import React from 'react';
import Block from './Block';
import { getSecPerBeat } from '../../utils/audio';

const rowStyle = {
  display: 'flex',
  gap: 2,
  alignItems: 'stretch',
  justifyContent: 'space-between',
  height: '120px',
  width: '100%',
};

const BlockRow = (props) => {
  const {
    audioSettings,
    color,
    inProgress,
    state,
    track,
    onCountdownFinished,
  } = props;
  const { bpm, beatsPerBar, barsPerLoop, maxBarsPerLoop } = audioSettings;
  const maxDuration = maxBarsPerLoop * beatsPerBar * getSecPerBeat(bpm);
  const numLoops = track
    ? Math.max(1, Math.floor(maxDuration / track.duration))
    : maxBarsPerLoop / barsPerLoop;
  const totalWaveformDivisions = 300;
  const divisionsPerLoop = Math.floor(totalWaveformDivisions / numLoops);
  return (
    <div class="block" style={rowStyle}>
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
