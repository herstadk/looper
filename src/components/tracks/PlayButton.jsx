import React from 'react';
import { FaPlay } from 'react-icons/fa'
import { Colors } from '../../styles/colors';

const PlayButton = ({onClick}, {playState}) => {
    
    return (
        <div id="play-button" data-playing="false">
            
            <FaPlay 
                style={{
                color: Colors.green, 
                cursor: 'pointer' 
                }} 
                //onClick={() => console.log("Clicked Play")}
                onClick={onClick}
            />
            
        </div>
    )
}

export default PlayButton
