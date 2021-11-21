import React from 'react';
import Block from './Block';
import { Colors } from '../../styles/colors';


const rowStyle = {
  display: 'flex',
  width: '100%',
  height: '20%',
  borderRadius: '5px',
  overflow: 'hidden',
  // backgroundColor: 'red'
}

const BlockRow = (props) => {
  const { color, track } = props;
  const loops = [1];
  return (
    <div style={rowStyle}>
      {loops.map( (loop, idx) => <Block color={color} loop={loop} key={idx} progress={0} />)}
    </div>
  );
}

export default BlockRow;