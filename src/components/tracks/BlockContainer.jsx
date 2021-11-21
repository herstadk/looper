import React from 'react';
import BlockRow from './BlockRow';
import { Colors } from '../../styles/colors';

const containerStyle = {
  display: 'flex',
  width: '75%',
  height: '90%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px'
}

const getBlockColor = (idx) => {
  const colorMap = [Colors.purple, Colors.blue, Colors.green, Colors.orange, Colors.red];
  return colorMap[idx % colorMap.length];
}

const BlockContainer = (props) => {
  const { tracks, state, onCountdownFinished } = props;
  return (
    <div style={containerStyle}>
      {tracks.map( (track, idx) => <BlockRow state={state} color={getBlockColor(idx)} track={track} key={idx} />)}
      {state.recording || state.countingDown ? <BlockRow state={state} color={getBlockColor(tracks.length)} inProgress onCountdownFinished={onCountdownFinished} /> : undefined}
    </div>
  );
}

export default BlockContainer;