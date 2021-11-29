import React from 'react';
import SaveButton from '../save/SaveButton';
import LoadButton from '../load/LoadButton';


const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: '5px',
};

const ModalButtons = (props) => {
    const {mediaBlobUrls, setMediaBlobUrls, loadFetchedAudioBuffers} = props;

    return (
        <div style={buttonContainerStyle} >
            <SaveButton mediaBlobUrls={mediaBlobUrls} />
            <LoadButton setMediaBlobUrls={setMediaBlobUrls} loadFetchedAudioBuffers={loadFetchedAudioBuffers} />
        </div>
    );
};


export default ModalButtons;