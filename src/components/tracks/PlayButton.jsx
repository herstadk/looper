import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'
import { Colors } from '../../styles/colors';

const PlayButton = ({onClick}, {playState}) => {
    
    var buttonType = null;

    buttonType = <FaPlay 
    style={{
        color: Colors.green, 
        cursor: 'pointer' 
        }} 
        onClick={onClick}/>
        

    return (
        <div>
            {playState}
                
            
        </div>
    )
}

export default PlayButton
