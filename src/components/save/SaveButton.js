import React, { useState } from 'react';
import SaveModal from './SaveModal';


const displaySaveModal = (setModalDisplay) => {
    setModalDisplay('block');
};

const SaveButton = ({ mediaBlobUrls }) => {
    const [modalDisplay, setModalDisplay] = useState('none');

    return (
        <>
        <button onClick={() => displaySaveModal(setModalDisplay)} className="modal-button" >
            Save Session
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