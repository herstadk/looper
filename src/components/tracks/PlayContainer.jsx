import React from 'react';
import BlockContainer from './BlockContainer';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const PlayContainer = (props) => {
  const { tracks } = props;

  return (
    <div style={containerStyle}>
      <BlockContainer tracks={tracks} />
    </div>
  );
}

export default PlayContainer
