import React, { useState } from 'react';
import {Colors} from '../../styles/colors';


const dropDownStyle = {
    backgroundColor: Colors.charcoal,
    color: Colors.green,
    appearance: 'auto',
    width: '35%',
    borderColor: Colors.green,
    textAlign: 'center',
}

const MonoStereoDropDown = ({ handleChannelCountChange, player }) => {
    const [numChannels, setNumChannels] = useState(1);

    return (
        <select style={dropDownStyle} onChange={() => handleChannelCountChange(numChannels, setNumChannels, player)} >
            <option value="1" selected>Mono</option>
            <option value="2">Stereo</option>
        </select>
    );
};


export default MonoStereoDropDown;