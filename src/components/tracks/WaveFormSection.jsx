import React from 'react';
import { Colors } from '../../styles/colors';

const WaveFormSection = (props) => {
  const { height } = props;
  return <div style={{height: height, backgroundColor: '#D3D3D3', flex: '0 0 0.2%'}}></div>;
}

export default WaveFormSection;