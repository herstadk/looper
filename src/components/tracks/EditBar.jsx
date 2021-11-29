import React from 'react';
import '../../styles/pageStyle.css';
import '../../styles/editStyle.css';
import PanSlider from '../effects/PanSlider';
import PitchSlider from '../effects/PitchSlider';
import ReverseSwitch from '../effects/ReverseSwitch';


const outerContainerStyle = {
  display: 'flex',
  width: '100%',
  height: '80%',
  alignItems: 'start',
  justifyContent: 'center',
};

const innerContainerStyle = {
  display: 'flex',
  gap: 2,
  width: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
  alignItems: 'center',
};

const effectsOuterContainerStyle = {
  display: 'flex',
  width: '100%',
}

const effectsInnerContainerStyle = {
  width: '50%',
  padding: '0 20px 0 20px',
  borderBottom: '1px dotted gray'
}

const EditBar = (props) => {
  const {
    getPitchValueFromBar,
    getPanValueFromBar,
    panFilters,
    pitchFilters,
    players,
    reverseAudio,
  } = props;

  return (
<<<<<<< HEAD
    <div className="item-editBar" style={outerContainerStyle} >
      <div style={innerContainerStyle}>
      {pitchFilters.map((pitchFilter, index) => {
        return (
          <div key={index} style={effectsOuterContainerStyle} >
            <div style={effectsInnerContainerStyle}>
              <PitchSlider
                getPitchValueFromBar={getPitchValueFromBar}
                pitchFilter={pitchFilter}
              />
              <ReverseSwitch
                reverseAudio={reverseAudio}
                player={players[index]}
              />
            </div>
            <div style={effectsInnerContainerStyle}>
              <PanSlider
                getPanValueFromBar={getPanValueFromBar}
                panFilter={panFilters[index]}
              />
            </div>
=======
    <div class="item-editBar">
      {pitchFilters.map((pitchFilter, index) => {
        return (
          <div class="item-editTools" key={index}>
            <PitchSlider
              getPitchValueFromBar={getPitchValueFromBar}
              pitchFilter={pitchFilter}
            />
            <ReverseSwitch
              reverseAudio={reverseAudio}
              player={players[index]}
            />
            <PanSlider
              getPanValueFromBar={getPanValueFromBar}
              panFilter={panFilters[index]}
            />
            <hr />
>>>>>>> main
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default EditBar;
