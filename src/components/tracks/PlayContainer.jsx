import React from 'react';
import PlayButton from './PlayButton';
import myAudio from "../../static/rain-03.mp3";

const PlayContainer = () => {

    var state = {
        audio: new Audio(myAudio),
        dataPlaying: false
    }

    // const PlayAudio = () => {
    //     console.log("Playing audio from function")
    //     if (state.dataPlaying === false){
    //         console.log("Play");
    //         state.audio.play();
    //         state.dataPlaying = true;
    //     } else {
    //         console.log("Pause");
    //         state.audio.pause();
    //         state.dataPlaying = false;
    //     }   
    // }

    return (
        <div
        style={{
            border: '3px solid #fff',
            padding: '20px'
        }}>
            <audio src={state.song}></audio>
            <div
            style={{
            fontSize: 48,
            }}>
            
            <PlayButton /*onClick = {PlayAudio} playState = {state.dataPlaying}*/ />
            </div>
            <div>
                max loop
            </div>
            <div>
                bpm
            </div>
            <div>
                meter
            </div>
        </div>
    )
}

export default PlayContainer
