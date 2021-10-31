import React from 'react';
import PlayButton from './PlayButton';
import myAudio from "../../static/rain-03.mp3";
import { FaPlay } from 'react-icons/fa';
import { Colors } from '../../styles/colors';

const PlayContainer = () => {

    //const myAudio = "../../static/rain-03.mp3"
    var state = {
        audio: new Audio(myAudio),
        dataPlaying: false
    }

    const PlayAudio = () => {
        console.log("Playing audio from function")
        if(state.dataPlaying === false){
            console.log("Play");
            state.audio.play();
            state.dataPlaying = true;
        }else{
            console.log("Pause");
            state.audio.pause();
            state.dataPlaying = false;
        }   
    }

    var buttonType = <FaPlay 
    style={{
        color: Colors.green, 
        cursor: 'pointer' 
        }} 
        onClick={PlayAudio}/>

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
            
            <PlayButton onClick = {PlayAudio} playState = {buttonType}/>
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
