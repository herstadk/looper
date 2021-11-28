export const getSecPerBeat = (bpm) => {
  return 1 / (bpm / 60);
};

export const durationToBeats = (duration, bpm) => {
  return Math.floor((duration * bpm) / 60);
};
