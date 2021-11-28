import React, { useState } from 'react';
import LoadModal from './LoadModal';


const displayLoadModal = (setModalDisplay) => {
    setModalDisplay('block');
};

const SaveButton = ({ mediaBlobUrls }) => {
    const [modalDisplay, setModalDisplay] = useState('none');

    return (
        <>
        <button onClick={() => displaySaveModal(setModalDisplay)}>
            Save audio
        </button>
        <SaveModal 
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
            mediaBlobUrls={mediaBlobUrls}
        />
        </>
    );
};

export default SaveButton;