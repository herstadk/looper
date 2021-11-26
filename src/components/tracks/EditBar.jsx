import React from 'react';
import '../../styles/pageStyle.css';
import PitchSlider from '../effects/PitchSlider';
import ReverseSwitch from '../effects/ReverseSwitch';


const EditBar = (props) => {

    const {getPitchValueFromBar, pitchFilters, players, reverseAudio} = props;

    return (
      <div class="editBar">
        {pitchFilters.map((pitchFilter, index) => {
          return (
            <>
              <PitchSlider
                getPitchValueFromBar={getPitchValueFromBar}
                pitchFilter={pitchFilter}
              />
              <ReverseSwitch
                reverseAudio={reverseAudio}
                player={players[index]}
              />
              <br />
            </>
          );
        })}
      </div>
    )
};

export default EditBar;
