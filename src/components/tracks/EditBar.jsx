import React from 'react';
import '../../styles/pageStyle.css';
import '../../styles/editStyle.css';
import PanSlider from '../effects/PanSlider';
import PitchSlider from '../effects/PitchSlider';
import ReverseSwitch from '../effects/ReverseSwitch';

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
          </div>
        );
      })}
    </div>
  );
};

export default EditBar;
