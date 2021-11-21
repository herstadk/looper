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
  const { tracks, isRecordingInProgress } = props;
  return (
    <div style={containerStyle}>
      {tracks.map( (track, idx) => <BlockRow color={getBlockColor(idx)} track={track} key={idx} />)}
      {isRecordingInProgress ? <BlockRow color={getBlockColor(tracks.length)} /> : undefined}
    </div>
  );
}

export default BlockContainer;