import React from 'react';
import BlockRow from './BlockRow';
import { Colors } from '../../styles/colors';
import Playhead from './Playhead';
import { useResizeDetector } from 'react-resize-detector';

const outerContainerStyle = {
  display: 'flex',
  overflow: 'auto',
  height: '80%',
  width: '80%',
  justifyContent: 'center',
  alignItems: 'start',
};

const innerContainerStyle = {
  display: 'flex',
  gap: 2,
  width: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
  alignItems: 'center',
};

const getBlockColor = (idx) => {
  const colorMap = [
    Colors.purple,
    Colors.blue,
    Colors.green,
    Colors.orange,
    Colors.red,
  ];
  return colorMap[idx % colorMap.length];
};

const BlockContainer = (props) => {
  const { audioSettings, tracks, state, onCountdownFinished, duration } = props;
  const { height, ref } = useResizeDetector();

  return (
    <div class="playBar" style={outerContainerStyle}>
      <Playhead
        state={state}
        showProgress
        height={height}
        duration={duration}
      />
      <div style={innerContainerStyle} ref={ref}>
        {tracks.map((track, idx) => (
          <BlockRow
            audioSettings={audioSettings}
            state={state}
            color={getBlockColor(idx)}
            track={track}
            key={idx}
          />
        ))}
        {state.recording || state.countingDown ? (
          <BlockRow
            audioSettings={audioSettings}
            state={state}
            color={getBlockColor(tracks.length)}
            inProgress
            onCountdownFinished={onCountdownFinished}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default BlockContainer;
