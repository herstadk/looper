import React from 'react';
import { postBlob } from '../../utils/blobs'; 

// need to update thisssssssssssssssssssssssssssssssssssssssssss
async function postToAzure(blobs) {
    let blobName = prompt("Name of audio file: ");

    for (let blob of blobs) {
        if (!blob.saved) {
            let 
            postBlob(file, blobName);
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