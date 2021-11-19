import React, { useEffect, useRef } from 'react';
import { IconContext } from 'react-icons';
// import { FaPlay, FaStop, BsRecordFill } from 'react-icons/fa';
import { BsRecordFill } from 'react-icons/bs';
import { Colors } from '../../styles/colors';


const style = {
	cursor: 'pointer'
};

const RecordButton = (props) => {
	const { onClick, isPlaying } = props;

	// to add an event listener
	const innerRef = useRef(null);

	useEffect(() => {
		const div = innerRef.current;

		div.addEventListener('click', flash);

		async function flash() {
			if (!isPlaying) {
				for (let i = 0; i < 10; i++) {
					div.style.visibility = 'hidden';
					await sleep(500);
					div.style.visibility = 'visible';
					await sleep(500);
				}
			}
			else {
				div.style.visibility = 'visible';
			}
		}

		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		return () => {
			div.removeEventListener('click', flash);
		}
	});

	return (
		<div ref={innerRef} >
			<IconContext.Provider value={{ color: Colors.red, size: 100, boxShadow: '0 0 3px #ff2200' }}>
				{isPlaying ? (
					<BsRecordFill
						onClick={() => onClick()}
						style={style}
					/>
				) : (
					<BsRecordFill
						onClick={() => onClick()}
						style={style}
					/>
				)}
			</IconContext.Provider>
		</div>
	);
};

export default RecordButton;
