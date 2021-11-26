import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import '../../styles/pageStyle.css';

const PitchSlider = (props) => {
    const {getPitchValueFromBar, pitchFilter} = props;
    const [pitchValue, setPitchValue] = useState(0);

    const marks = [
        {
            value: -10,
            label: '-10',
        },
        {
            value: -5,
            label: '-5',
        },
        {
          value: 0,
          label: '0',
        },
        {
          value: 5,
          label: '5',
        },
        {
          value: 10,
          label: '10',
        },
    ];

    function valuetext(value) {
        setPitchValue(value);
        return `${value}`;
    }

    return (
        <>
            {"Pitch"}
            <Slider
                aria-label= "Steps"
                defaultValue={0.0}
                step={0.05}
                min={-10.0}
                max={10.0}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={marks}
            />
            {getPitchValueFromBar(pitchValue, pitchFilter)}
        </>
    )
};

export default PitchSlider;