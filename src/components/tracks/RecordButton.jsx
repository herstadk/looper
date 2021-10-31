import React from 'react';
import { IconContext } from 'react-icons';
import { FaPlay, FaStop } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const buttonStyle = {
	cursor: 'pointer',
};

const RecordButton = (props) => {
	const { onClick, isRecording } = props;
	return (
		<div data-testid={'record-button'}>
			<IconContext.Provider value={{ color: Colors.green, size: 100 }}>
				{isRecording ? (
					<FaStop
						data-testid={'stop-icon'}
						onClick={() => onClick()}
						style={buttonStyle}
					/>
				) : (
					<FaPlay
						data-testid={'play-icon'}
						onClick={() => onClick()}
						style={buttonStyle}
					/>
				)}
			</IconContext.Provider>
		</div>
	);
};

export default RecordButton;
