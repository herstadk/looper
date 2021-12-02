/************************
 * 
 * modal styling from https://www.w3schools.com/howto/howto_css_modals.asp
 *
************************/

import React, { useEffect } from 'react';
import {postBlob} from '../../utils/blobs';
import {v4 as uuidv4} from 'uuid';
import '../../styles/pageStyle.css';


const getModalStyle = (modalDisplay) => {
    return {
        display: modalDisplay,
        position: 'fixed', /* Stay in place */
        zIndex: 1, /* Sit on top */
        left: 0,
        top: 0,
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        // backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
    };
};

/* Modal Content/Box */
const modalContentStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto', /* 15% from the top and centered */
    padding: '20px',
    border: '1px solid #888',
    width: '80%', /* Could be more or less, depending on screen size */
    borderRadius: '5px',
}

/* The Close Button */
const closeButtonStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
}

const closeSaveModal = (setModalDisplay) => {
    document.getElementById('session-name').value = '';
    document.getElementById('session-description').value = '';
    setModalDisplay('none');
};

const SaveModal = (props) => {
    const {modalDisplay, setModalDisplay, mediaBlobUrls} = props;

    useEffect(() => {
        function hideModal(e) {
            let modal = document.getElementById('modal');

            if (e.target === modal) {
                setModalDisplay('none');
            }
        }

        window.addEventListener('click', hideModal);

        return () => {
            window.removeEventListener('click', hideModal);
        }
    });

    async function saveSession(e) {
        e.preventDefault();

        // get session name
        let sessionName = document.getElementById('session-name').value;
        if (sessionName === undefined || sessionName === null || sessionName.length === 0) {
            alert('Please enter a name for your session.');
            return;
        }

        // get session description
        let sessionDescription = document.getElementById('session-description').value;
        if (sessionDescription === undefined || sessionDescription === null || sessionDescription.length === 0) {
            alert('Please enter a description for your session.');
            return;
        }
    
        // session object to save
        let session = {
            SessionName: sessionName,
            SessionDate: new Date().toISOString().slice(0, 10).replace('T', ' '),
            SessionDescription: sessionDescription
        };
    
        let tracks = []
        for (let i = 0; i < mediaBlobUrls.length; i++) {
            let trackName = uuidv4();
            tracks.push({ TrackName: trackName });
        }
    
        let sessionTrackDto = {
            Session: session,
            Tracks: tracks
        }

        let errorCheck = {
            error: false,
            message: null
        };  // tracking is there was an error in saving

        // save session and tracks in AWS database
        await fetch('https://loopraudio.com/api/audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionTrackDto)
        })
        .then(res => {
            if (!res.ok) {
                errorCheck.error = true;
                errorCheck.message = res.statusText;
            }
        });
    
        // save the audio file to Azure
        // turn each blob url into a blob object before saving
        for (let i = 0; i < mediaBlobUrls.length; i++) {
            let mediaBlob = await fetch(mediaBlobUrls[i].mediaBlobUrl).then(b => b.blob());
            postBlob(mediaBlob, tracks[i].TrackName, errorCheck);
        }

        if (errorCheck.error) {
            alert("Oops, something went wrong saving your audio file: " + errorCheck.message);
        } else {
            alert("Session saved!");
        }

        // clear forms and close modal
        document.getElementById('session-name').value = '';
        document.getElementById('session-description').value = '';
        setModalDisplay('none');
    }

    return (
        <div style={getModalStyle(modalDisplay)} id="modal">
            <div style={modalContentStyle}>
                <span style={closeButtonStyle} className="close" onClick={() => closeSaveModal(setModalDisplay)}>&times;</span>
                <form onSubmit={saveSession} >
                    <label htmlFor="session-name">Session Name: </label>
                    <input id="session-name" type="textarea" />
                    <br />

                    <label htmlFor="session-description">Session Description: </label>
                    <textarea id="session-description"></textarea>
                    <br />

                    <input type="submit" value="Save" className="modal-save-button"/>
                </form>
            </div>
        </div>
    );
};


export default SaveModal;