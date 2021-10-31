import React from 'react';
import { postBlob } from '../../utils/blobs'; 

function postToAzure(blobs) {
    let blobName = prompt("Name of audio file: ");

    for (let blob of blobs) {
        if (!blob.saved) {
            postBlob(blob, blobName);
        }
    }
}

const SaveButton = ({ mediaBlobUrls }) => {
    return (
        <button onClick={() => postToAzure(mediaBlobUrls)}>
            Save audio
        </button>
    );
};

export default SaveButton;