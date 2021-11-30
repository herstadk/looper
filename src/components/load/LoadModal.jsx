/************************
 * 
 * modal styling from https://www.w3schools.com/howto/howto_css_modals.asp
 *
************************/

import React, { useEffect, useState } from 'react';
import '../../styles/pageStyle.css';
import {getBlob} from '../../utils/blobs';
import {Colors} from '../../styles/colors';


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
    height: '50%',
    borderRadius: '5px',
    position: 'relative',
};

/* The Close Button */
const closeButtonStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
};

const tableStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const rowStyle = {
    display: 'flex',
};

const cellStyle = {
    width: '33%',
    border: '1px dotted black',
    borderWidth: '1px 0 1px 0',
    paddingLeft: '5px',
};

const headerStyle = {
    width: '33%',
    fontWeight: 'bolder',
    border: '1px dotted black',
    borderWidth: '1px 0 0 0',
    paddingLeft: '5px',
};

const closeLoadModal = (setModalDisplay) => {
    setModalDisplay('none');
};

const getAllSessions = async () => {
    let sessionsObject = await fetch('http://loopr.us-west-1.elasticbeanstalk.com/api/audio').then(res => res.json());
    let sessions = sessionsObject['$values'];
    return sessions;
};

const LoadModal = (props) => {
    const {modalDisplay, setModalDisplay, loadFetchedAudioBuffers, setMediaBlobUrls} = props;
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        function hideLoadModal(e) {
            let modal = document.getElementById('load-modal');

            if (e.target === modal) {
                setModalDisplay('none');
            }
        }

        window.addEventListener('click', hideLoadModal);

        return () => {
            window.removeEventListener('click', hideLoadModal);
        }
    });

    // populate sessions list with existing sessions
    useEffect(() => {
        async function populateList() {
            let allSessions = await getAllSessions();
            setSessions(allSessions);
        }
        populateList();
    }, []);

    // change color of selected row so user knows which sessions is being loaded
    const changeSelected = (e) => {
        // deactivate last selected row
        let activeRows = document.getElementsByClassName('active-row');
        for (let row of activeRows) {
            let childrenToDeactivate = row.children;
            for (let child of childrenToDeactivate) {
                child.style.backgroundColor = 'white';
            }
            row.classList.remove('active-row')
        }

        // make selected row active
        let children = e.currentTarget.children;
        for (let child of children) {
            child.style.backgroundColor = Colors.green;
        }
        e.currentTarget.classList.add('active-row');
    };

    // load selected session into the current session
    const loadSession = async () => {
        let sessionToLoadList = document.getElementsByClassName('active-row');
        // don't load if there isn't anything to load or sessionsToLoadList
        // isn't one item in length
        if (sessionToLoadList.length === 0 || sessionToLoadList.length > 1) {
            alert('Please select a session to load.');
            return;
        }
        let sessionName = sessionToLoadList[0].children[0].textContent;
        let sessionToLoad = null;

        // get the session we need
        for (let session of sessions) {
            if (session.sessionName === sessionName) {
                sessionToLoad = session;
                break;
            }
        }

        // don't do anything if session did not exist
        if (sessionToLoad === null) {
            alert('Please select a session to load.');
            return;
        }

        // get all of the tracks
        let trackObjects = await fetch(`http://loopr.us-west-1.elasticbeanstalk.com/api/audio/${sessionToLoad.sessionId}`)
                              .then(res => res.json())
                              .then(sessionObj => sessionObj.tracks['$values']);

        // get all blobs from azure and load them into program
        let blobs = [];
        for (let track of trackObjects) {
            let blob = await getBlob(track.trackName);
            blobs.push(blob);
        }

        loadFetchedAudioBuffers(blobs);
        setMediaBlobUrls([...blobs]);

        // close modal
        setModalDisplay('none');
    };

    return (
        <div style={getModalStyle(modalDisplay)} id="load-modal">
            <div style={modalContentStyle}>
                <span style={closeButtonStyle} className="close" onClick={() => closeLoadModal(setModalDisplay)}>&times;</span>
                <div style={tableStyle}>
                    <div style={rowStyle}>
                        <div style={headerStyle}>
                            Session Name
                        </div>
                        <div style={headerStyle}>
                            Date
                        </div>
                        <div style={headerStyle}>
                            Description
                        </div>
                    </div>
                    {sessions.map((session, index) => {
                        return (
                            <div style={rowStyle} onClick={changeSelected} className="modal-load-row" key={index}>
                                <div style={cellStyle}>
                                    {session.sessionName}
                                </div>
                                <div style={cellStyle}>
                                    {session.sessionDate.substring(0, 10)}
                                </div>
                                <div style={cellStyle}>
                                    {session.sessionDescription}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={loadSession} className="modal-load-button">Load</button>
            </div>
        </div>
    );
};


export default LoadModal;