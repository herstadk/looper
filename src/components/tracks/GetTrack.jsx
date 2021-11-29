import React from 'react';
import PlayDropdown from './PlayDropDown';

const GetTrack = (props) => {
    const {
        setAudioSelection,
    } = props;
    
    return (
        <div class="playDropDown">
            <PlayDropdown setAudioSelection={setAudioSelection} />
        </div>
    )
}

export default GetTrack
