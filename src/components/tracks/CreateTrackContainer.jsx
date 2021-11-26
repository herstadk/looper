import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import PlayContainer from './PlayContainer';
import EditBar from './EditBar';
import { getAllBlobs, getBlob } from '../../utils/blobs';
import '../../styles/pageStyle.css';
import { useReactMediaRecorder } from 'react-media-recorder';
import Timer from './Timer';
import * as Tone from 'tone';
import { getSecPerBeat } from '../../utils/audio';


const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const initialState = {
  initiatingCountdown: false,
  recording: false,
  countingDown: false,
  playingAudio: false,
  expiryTimestamp: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECORDING_STARTED':
      return {
        ...state,
        recording: true,
        playingAudio: true,
        countingDown: false,
        expiryTimestamp: action.payload.expiryTimestamp,
      };
    case 'RECORDING_ENDED':
      return {
        ...state,
        recording: false,
        playingAudio: false,
        expiryTimestamp: undefined,
      };
    case 'COUNTDOWN_STARTED':
      return {
        ...state,
        countingDown: true,
        expiryTimestamp: action.payload.expiryTimestamp,
      };
    case 'COUNTDOWN_ENDED':
      return { ...state, countingDown: false, expiryTimestamp: undefined };
    default:
      return initialState;
  }
};

const CreateTrackContainer = (props) => {
  const { audioContext } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mediaBlobUrls, setMediaBlobUrls] = useState([]);
  const [audioBuffers, setAudioBuffers] = useState([]);
  const [bpm] = useState(120);
  const [beatsPerBar] = useState(4);
  const [maxBarsPerLoop] = useState(4);
  const [player, setPlayer] = useState(null); // Tone.js player to play mixed audio buffer
  const [pitchFilter, setPitchFilter] = useState(null);
  const [barsPerLoop, setBarsPerLoop] = useState(undefined);
  const [pitchValue, setPitchValueFromBar] = useState(null);  // used to set pitch value for Tone.js
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobOptions: { type: 'audio/mpeg' },
    onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
  });

  const getAudioSettings = () =>{
    return {bpm: bpm, beatsPerBar: beatsPerBar, barsPerLoop: barsPerLoop, maxBarsPerLoop: maxBarsPerLoop};
  }

  const getTrackDuration = () => {
    return maxBarsPerLoop * beatsPerBar * getSecPerBeat(bpm);
  };

  const loadAudioBuffer = useCallback(
    (mediaBlobUrl) => {
      const request = new XMLHttpRequest();
      request.open('GET', mediaBlobUrl);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        const undecodedAudio = request.response;
        audioContext.decodeAudioData(undecodedAudio, (audioBuffer) =>
          addAudioBuffer(audioBuffer)
        );
      };

      request.send();
    },
    [audioContext]
  );

  const loadFetchedAudioBuffers = useCallback(
    (allBlobs) => {
      for (const blob of allBlobs) {
        loadAudioBuffer(blob.mediaBlobUrl);
      }
    },
    [loadAudioBuffer]
  );

  useEffect(() => {
    /**
     *
     *
     * Testing get requests from azure
     *
     *
     */
    async function myfunc() {
      let allBlobs = await getAllBlobs();
      loadFetchedAudioBuffers(allBlobs);
      setMediaBlobUrls([...allBlobs]);
    }
    myfunc();
    /**
     *
     *
     *
     * End testing get requests
     *
     *
     *
     */
  }, [loadFetchedAudioBuffers]);

  const addMediaBlobUrl = (newMediaBlobUrl) => {
    newMediaBlobUrl.saved = false;
    setMediaBlobUrls((curMediaBlobUrls) => [
      ...curMediaBlobUrls,
      newMediaBlobUrl,
    ]);
    loadAudioBuffer(newMediaBlobUrl.mediaBlobUrl);
  };

  const addAudioBuffer = (newAudioBuffer) => {
    setAudioBuffers((curAudioBuffers) => [...curAudioBuffers, newAudioBuffer]);
  };

  const playAudio = () => {
    if (mediaBlobUrls.length === 0) {
      return; // don't attempt to play without any audio elements loaded
    }

    // create pitch shift and connect to destination
    const pitchShift = new Tone.PitchShift().toDestination();

    // create player connected to pitch shift effect with the mixed audio buffer as the source
    // set player so that audio is looped
    let mixedBuffer = mixAudioBuffers(audioBuffers);
    const newPlayer = new Tone.Player(mixedBuffer).connect(pitchShift);
    // newPlayer.loop = true;

    // get the current frequency data of connected audio source using a fast Fourier transform
    const toneFFT = new Tone.FFT();
    pitchShift.connect(toneFFT);
    pitchShift.pitch = pitchValue;
    setPitchFilter(pitchShift);

    // play the audio
    setPlayer(newPlayer);
    newPlayer.start();
  };

  const mixAudioBuffers = (audioBuffers) => {
    const numChannels = getMinNumChannels(audioBuffers);
    const length = getMaxTrackLength(audioBuffers);
    const mix = audioContext.createBuffer(
      numChannels,
      length,
      audioContext.sampleRate
    );
    for (const audioBuffer of audioBuffers) {
      // Mix sound channels seperately
      for (let channel = 0; channel < numChannels; channel++) {
        const mixChannelBuffer = mix.getChannelData(channel);
        const audioChannelBuffer = audioBuffer.getChannelData(channel);
        let totalBytes = 0;
        // Loop all but the longest track
        while (totalBytes < length) {
          // Sum audio byte by byte
          for (let byte = 0; byte < audioBuffer.length; byte++) {
            mixChannelBuffer[totalBytes] += audioChannelBuffer[byte];
            totalBytes += 1;
          }
        }
      }
    }

    return mix;
  };

  const getMinNumChannels = (audioBuffers) => {
    return Math.min(...audioBuffers.map((x) => x.numberOfChannels));
  };

  const getMaxTrackLength = (audioBuffers) => {
    return Math.max(...audioBuffers.map((x) => x.length));
  };

  const startCountdown = () => {
    const time = setTimer(3);
    return time;
  };

  const onCountdownFinished = () => {
    playAudio();
    const time = startLoopRecording();
    dispatch({ type: 'RECORDING_STARTED', payload: { expiryTimestamp: time } });
  };

  const onRecordingFinished = () => {
    stopLoopRecording();
    dispatch({ type: 'RECORDING_ENDED' });
  };

  const stopLoopRecording = () => {
    stopRecording();
    stopPlayback();
  };

  const setTimer = (duration) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
  };

  const startLoopRecording = () => {
    const duration = barsPerLoop * beatsPerBar * getSecPerBeat();
    const time = setTimer(duration);
    startRecording();
    return time;
  };

  const stopPlayback = () => {
    player.stop();
  };

  const handleStartRecording = (numBars) => {
    if (state.recording || state.countingDown || state.playingAudio) {
      return;
    }

    if (status === 'permission_denied') {
      console.log('Permission denied');
      return;
    }
    setBarsPerLoop(numBars);
    const time = startCountdown();
    dispatch({ type: 'COUNTDOWN_STARTED', payload: { expiryTimestamp: time } });
  };

  const [audioSelection, setAudioSelection] = useState(null);
  const getAudioSelection = (childData) => {
	  setAudioSelection(childData);
  }

	const getPitchValueFromBar = (data, pitchFilter) => {
    if (pitchFilter !== null) {
      pitchFilter.pitch = data;  // bad form right hurrrrrrrrrrrrrrrrr
    }
		setPitchValueFromBar(data);
		console.log("Create Track has pitch:", data);
	}

  return (
    <div style={containerStyle}>
      <button onClick={async () => {
        const blob = await getBlob(audioSelection);
        console.log("Blob", blob);
        addMediaBlobUrl(blob);
      }}>
        Get Track
      </button>
      {state.recording ? (
        <Timer
          onExpire={onRecordingFinished}
          expiryTimestamp={state.expiryTimestamp}
        />
      ) : undefined}
      <div class="flex-container">
        <div class="flex-child left">
          <ControlPanel
            state={state}
            mediaBlobUrls={mediaBlobUrls}
            handleStartRecording={handleStartRecording}
            stopPlayback={stopPlayback}
            stopRecording={stopLoopRecording}
          />
          <PlayContainer
            tracks={audioBuffers}
            state={state}
            onCountdownFinished={onCountdownFinished}
            duration={getFullDuration()}
            getAudioSelection={getAudioSelection}
          />
        </div>
        <div class="flex-child right">
          <EditBar
            getPitchValueFromBar={getPitchValueFromBar}
            name={'Pitch'}
            pitchFilter={pitchFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrackContainer;
