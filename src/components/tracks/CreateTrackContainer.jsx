import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import PlayContainer from './PlayContainer';
import EditBar from './EditBar';
import { getAllBlobs, getBlob } from '../../utils/blobs';
import '../../styles/pageStyle.css';
import { useReactMediaRecorder } from 'react-media-recorder';
import Timer from './Timer';
import * as Tone from 'tone';


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
  const [players, setPlayers] = useState([]); // Tone.js list of players for each audio buffer
  const [pitchFilters, setPitchFilters] = useState([]); // tracking pitch filters for each player
  const [panFilters, setPanFilters] = useState([]);
  const [barsPerLoop, setBarsPerLoop] = useState(undefined);
  // const [pitchValue, setPitchValueFromBar] = useState(null);  // used to set pitch value for Tone.js
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobOptions: { type: 'audio/mpeg' },
    onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
  });

  const getSecPerBeat = () => {
    return 1 / (bpm / 60);
  };

  const getFullDuration = () => {
    return maxBarsPerLoop * beatsPerBar * getSecPerBeat();
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

  // create players and filters
  useEffect(() => {
    let allPlayers = [];
    let allPitchFilters = [];
    let allPanFilters = [];

    for (let buffer of audioBuffers) {
      // init pitch shift filter
      let pitchShift = new Tone.PitchShift();
      let toneFFT = new Tone.FFT(); // fast fourier transformation for frequency
      pitchShift.connect(toneFFT);

      // init panner filter
      let panner = new Tone.Panner();
      panner.connect(toneFFT);

      // init player
      let player = new Tone.Player(buffer);
      // player.connect(panner);
      // player.connect(pitchShift);
      // player.fan(panner, pitchShift);
      player.chain(pitchShift, panner, Tone.Destination);
      player.loop = true;
      player.autostart = true;

      allPlayers.push(player);
      allPitchFilters.push(pitchShift);
      allPanFilters.push(panner);
    }

    setPlayers(allPlayers);
    setPitchFilters(allPitchFilters);
    setPanFilters(allPanFilters);
  }, [audioBuffers]);

  const playAudio = () => {
    if (mediaBlobUrls.length === 0) {
      return; // don't attempt to play without any audio elements loaded
    }

    // play all audio
    startAllPlayers();
  };

  const startAllPlayers = () => {
    for (let player of players) {
      player.start();
    }
  }

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
    for (let player of players) {
      player.stop();
    }
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
  };

  // changes pitch of audio in real time during playback
	const getPitchValueFromBar = (data, pitchFilter) => {
    if (pitchFilter !== null && pitchFilter !== undefined) {
      pitchFilter.pitch = data;  // bad form right hurrrrrrrrrrrrrrrrr?????????????
    }
	};

  // changes panning of audio in real time during plaback
  const getPanValueFromBar = (data, panFilter) => {
    if (panFilter !== null && panFilter !== undefined) {
      panFilter.pan.setValueAtTime(data, 0); // another bad form right hurrrrrrrrrrrrrr????????????????????
    }
  };

  // changes if the audio is reversed
  const reverseAudio = (player, checked) => {
    if (player !== null && player !== undefined) {
      if (checked) {
        player.reverse = true;
      }
      else {
        player.reverse = false;
      }
    }
  };

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
            getPanValueFromBar={getPanValueFromBar}
            reverseAudio={reverseAudio}
            pitchFilters={pitchFilters}
            panFilters={panFilters}
            players={players}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrackContainer;
