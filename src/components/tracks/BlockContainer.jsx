import React from 'react';
import BlockRow from './BlockRow';
import { Colors } from '../../styles/colors';
import ProgressBar from './ProgressBar';
import { useResizeDetector } from 'react-resize-detector';

const outerContainerStyle = {
  display: 'flex',
  height: '80%',
  width: '80%',
  justifyContent: 'center',
  alignItems: 'start',
};

const innerContainerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
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
  const { tracks, state, onCountdownFinished, duration } = props;
  const { height, width, ref } = useResizeDetector();

  return (
    <div style={outerContainerStyle}>
      {/* <ProgressBar
        state={state}
        showProgress
        height={height}
        width={width}
        duration={duration}
      /> */}
      <div style={innerContainerStyle} ref={ref}>
        {tracks.map((track, idx) => (
          <BlockRow
            state={state}
            color={getBlockColor(idx)}
            track={track}
            key={idx}
          />
        ))}
        {state.recording || state.countingDown ? (
          <BlockRow
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
