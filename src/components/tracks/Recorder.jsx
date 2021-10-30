import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordButton from './RecordButton';

const Recorder = (props) => {
  const { addMediaBlobUrl } = props;
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    blobOptions: { type: 'audio/mpeg' },
    onStop: (newMediaBlobUrl) => addMediaBlobUrl(newMediaBlobUrl),
  });

  return (
    <>
      <RecordButton
        onClick={() => {
          if (status === 'idle' || status === 'stopped') {
            startRecording();
          } else if (status === 'recording') {
            stopRecording();
          } else if (status === 'permission_denied') {
            console.log('Permission denied');
          } else {
            console.log('Something went wrong');
          }
        }}
        isRecording={status === 'recording' || status === 'stopping'}
      />
    </>
  );
};

export default Recorder;
