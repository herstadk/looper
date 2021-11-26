import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import '../../styles/pageStyle.css';

const EditBar = (props) => {

    const {getPitchValueFromBar, name, pitchFilter} = props;

    const [pitchValue, setPitch] = useState(null);

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
        console.log("Slider:", value)
        setPitch(value);
        return `${value}`;
    }

    return (
        <div class="editBar">
            {name}
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
        </div>
    )
}

export default EditBar
