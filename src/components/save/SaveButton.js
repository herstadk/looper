import React from 'react';
import { postBlob } from '../../utils/blobs'; 

async function saveSession(blobs) {
    // get session name and make session object
    let sessionName = prompt('What do you want to name this session? ');
    let session = {
        SessionName: sessionName,
        SessionDate: new Date().toISOString().slice(0, 10).replace('T', ' ')
    };

    let tracks = []
    for (let i = 0; i < blobs.length; i++) {
        let trackName = prompt('Name your track: ');
        tracks.push({ TrackName: trackName });
    }

    await fetch('http://loopr.us-west-1.elasticbeanstalk.com/api/audio')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => {
        console.log(err);
    });

    let sessionTrackDto = {
        Session: session,
        Tracks: tracks
    }

    // save session and tracks in AWS database
    await fetch('http://loopr.us-west-1.elasticbeanstalk.com/api/audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionTrackDto)
    })
    .then(res => {
        if (res.ok) {
            alert('audio file saved!');
        }
        else {
            alert('Oops, something went wrong! ' + res.statusText);
        }
    });

    // // save the audio file to Azure
    for (let i = 0; i < blobs.length; i++) {
        let mediaBlob = await fetch(blobs[i].mediaBlobUrl).then(b => b.blob());
        postBlob(mediaBlob, tracks[i].TrackName);
    }
}

const SaveButton = ({ mediaBlobUrls }) => {
    return (
        <button onClick={() => saveSession(mediaBlobUrls)}>
            Save audio
        </button>
    );
};

export default SaveButton;