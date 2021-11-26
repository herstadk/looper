import React from 'react';
import '../../styles/pageStyle.css';
import PitchSlider from '../effects/PitchSlider';

const EditBar = (props) => {

    const {getPitchValueFromBar, pitchFilters} = props;

    return (
      <div class="editBar">
        {pitchFilters.map(pitchFilter => {
          return (
            <PitchSlider
              getPitchValueFromBar={getPitchValueFromBar}
              pitchFilter={pitchFilter}
            />
          );
        })}
      </div>
    )
};

export default EditBar;
