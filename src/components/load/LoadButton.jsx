import React, { useState } from 'react';
import LoadModal from './LoadModal';


const displayLoadModal = (setModalDisplay) => {
    setModalDisplay('block');
};

const SaveButton = ({ loadFetchedAudioBuffers, setMediaBlobUrls }) => {
    const [modalDisplay, setModalDisplay] = useState('none');

    return (
        <>
        <button onClick={() => displayLoadModal(setModalDisplay)}>
            Load Session
        </button>
        <LoadModal
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
            loadFetchedAudioBuffers={loadFetchedAudioBuffers}
            setMediaBlobUrls={setMediaBlobUrls}
        />
        </>
    );
};

export default SaveButton;