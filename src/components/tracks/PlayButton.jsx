import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlay, FaStop } from 'react-icons/fa'
import { Colors } from '../../styles/colors';

const buttonStylePlay = {
    cursor: 'pointer',
    color: Colors.green,
}
const buttonStyleStop = {
    cursor: 'pointer',
    color: Colors.red,
}

const PlayButton = (props) => {
    const { onClick, isPlaying } = props;

    return (
        <div data-testid={'record-button'}>
            <IconContext.Provider value={{ color: Colors.green, size: 100 }}>
				{isPlaying ? (
					<FaStop
                        data-testid={'stop-icon'}
                        style={buttonStyleStop} 
                        onClick={() => onClick()}
					/>
				) : (
					<FaPlay
                        data-testid={'play-icon'}
                        style={buttonStylePlay} 
                        onClick={() => onClick()}
                    />
				)}
			</IconContext.Provider>
        </div>
    )
}

export default PlayButton
