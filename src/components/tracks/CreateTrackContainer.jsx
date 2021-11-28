import React, { useState, useEffect, useReducer, useCallback } from 'react';
import ControlPanel from './ControlPanel';
import PlayContainer from './PlayContainer';
import EditBar from './EditBar';
import { getBlob } from '../../utils/blobs';
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
        expiryTimestamp: undefined,
      };
    case 'PLAYBACK_STARTED':
      return {
        ...state,
        playingAudio: true,
      };
    case 'PLAYBACK_ENDED':
      return {
        ...state,
        playingAudio: false,
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
  const [processedAudioBuffers, setProcessedAudioBuffers] = useState([]);
  const [bpm] = useState(120);
  const [beatsPerBar] = useState(4);
  const [maxBarsPerLoop] = useState(4);
  const [players, setPlayers] = useState([]); // Tone.js list of players for each audio buffer
  const [pitchFilters, setPitchFilters] = useState([]); // tracking pitch filters for each player
  const [panFilters, setPanFilters] = useState([]);
  const [barsPerLoop, setBarsPerLoop] = useState(4);
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobOptions: { type: 'audio/mpeg' },
    onStop: (mediaBlobUrl) => addMediaBlobUrl({ mediaBlobUrl }),
  });
  const getAudioSettings = () => {
    return {
      bpm: bpm,
      beatsPerBar: beatsPerBar,
      barsPerLoop: barsPerLoop,
      maxBarsPerLoop: maxBarsPerLoop,
    };
  };

  const getTrackDuration = () => {
    return maxBarsPerLoop * beatsPerBar * getSecPerBeat(bpm);
  };

  const createPlayerFromBuffer = useCallback(
    (buffer) => {
      // init pitch shift filter
      const pitchShift = new Tone.PitchShift();
      const toneFFT = new Tone.FFT(); // fast fourier transformation for frequency
      pitchShift.connect(toneFFT);
      setPitchFilters((curPitchFilters) => [...curPitchFilters, pitchShift]);

      // init panner filter
      const panner = new Tone.Panner();
      setPanFilters((curPanFilters) => [...curPanFilters, panner]);
      pitchShift.chain(panner, Tone.Destination);

      // init player for each loop
      const loops = maxBarsPerLoop / barsPerLoop;
      for (let i = 0; i < loops; i++) {
        const player = new Tone.Player(buffer);
        player.chain(pitchShift);
        player.sync().start(`${i * barsPerLoop}m`);
        setPlayers((curPlayers) => [...curPlayers, player]);
      }
    },
    [barsPerLoop, maxBarsPerLoop]
  );

  const addAudioBuffer = useCallback(
    (newAudioBuffer) => {
      setAudioBuffers((curAudioBuffers) => [
        ...curAudioBuffers,
        newAudioBuffer,
      ]);
      createPlayerFromBuffer(newAudioBuffer);
    },
    [createPlayerFromBuffer]
  );

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
    [audioContext, addAudioBuffer]
  );

  // const loadFetchedAudioBuffers = useCallback(
  //   (allBlobs) => {
  //     for (const blob of allBlobs) {
  //       loadAudioBuffer(blob.mediaBlobUrl);
  //     }
  //   },
  //   [loadAudioBuffer]
  // );

  // useEffect(() => {
  //   /**
  //    *
  //    *
  //    * Testing get requests from azure
  //    *
  //    *
  //    */
  //   async function myfunc() {
  //     let allBlobs = await getAllBlobs();
  //     loadFetchedAudioBuffers(allBlobs);
  //     setMediaBlobUrls([...allBlobs]);
  //   }
  //   myfunc();
  //   /**
  //    *
  //    *
  //    *
  //    * End testing get requests
  //    *
  //    *
  //    *
  //    */
  // }, [loadFetchedAudioBuffers]);

  const addMediaBlobUrl = (newMediaBlobUrl) => {
    newMediaBlobUrl.saved = false;
    setMediaBlobUrls((curMediaBlobUrls) => [
      ...curMediaBlobUrls,
      newMediaBlobUrl,
    ]);
    loadAudioBuffer(newMediaBlobUrl.mediaBlobUrl);
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = '0m';
    Tone.Transport.loopEnd = `${maxBarsPerLoop}m`;
  }, [bpm, maxBarsPerLoop]);

  useEffect(() => {
    for (const buffer of audioBuffers) {
      if (!processedAudioBuffers.includes(buffer)) {
        createPlayerFromBuffer(buffer);
        setProcessedAudioBuffers((curProcessedAudioBuffers) => [
          ...curProcessedAudioBuffers,
          buffer,
        ]);
      }
    }
  }, [audioBuffers, createPlayerFromBuffer, processedAudioBuffers]);

  const playAudio = () => {
    Tone.Transport.start();
    dispatch({ type: 'PLAYBACK_STARTED' });
  };

  const pauseAudio = () => {
    Tone.Transport.pause();
    dispatch({ type: 'PLAYBACK_ENDED' });
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
  };

  const setTimer = (duration) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
  };

  const startLoopRecording = () => {
    const duration = barsPerLoop * beatsPerBar * getSecPerBeat(bpm);
    const time = setTimer(duration);
    startRecording();
    return time;
  };

  const handleStartRecording = (numBars) => {
    if (state.recording || state.countingDown) return;

    if (status === 'permission_denied') {
      console.log('Permission denied');
      return;
    }
    if (numBars > maxBarsPerLoop) return;
    if (!state.playingAudio) Tone.Transport.stop(); // reset time incase paused
    Tone.start();
    setBarsPerLoop(numBars);

    const progress = Tone.Transport.progress;
    const delay = state.playingAudio
      ? (1 - progress) * maxBarsPerLoop * beatsPerBar * getSecPerBeat(bpm)
      : 3;

    const time = setTimer(delay);
    dispatch({ type: 'COUNTDOWN_STARTED', payload: { expiryTimestamp: time } });
  };

  const [audioSelection, setAudioSelection] = useState(undefined);

  // changes pitch of audio in real time during playback
  const getPitchValueFromBar = (data, pitchFilter) => {
    if (pitchFilter !== null && pitchFilter !== undefined) {
      pitchFilter.pitch = data; // bad form right hurrrrrrrrrrrrrrrrr?????????????
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
      } else {
        player.reverse = false;
      }
    }
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={async () => {
          const blob = await getBlob(audioSelection);
          addMediaBlobUrl(blob);
        }}
      >
        Get Track
      </button>
      {state.recording ? (
        <Timer
          onExpire={onRecordingFinished}
          expiryTimestamp={state.expiryTimestamp}
        />
      ) : undefined}
      <div className="flex-container">
        <div className="flex-child left">
          <ControlPanel
            state={state}
            mediaBlobUrls={mediaBlobUrls}
            handleStartRecording={handleStartRecording}
            startPlayback={playAudio}
            stopPlayback={pauseAudio}
            stopRecording={stopLoopRecording}
          />
          <PlayContainer
            audioSettings={getAudioSettings()}
            tracks={audioBuffers}
            state={state}
            onCountdownFinished={onCountdownFinished}
            duration={getTrackDuration()}
            setAudioSelection={setAudioSelection}
          />
        </div>
        <div className="flex-child right">
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
