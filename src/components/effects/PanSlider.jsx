import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import '../../styles/pageStyle.css';

const PanSlider = (props) => {
  const { getPanValueFromBar, panFilter } = props;
  const [panValue, setPanValue] = useState(0);

  const marks = [
    {
      value: -1,
      label: '-1',
    },
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (e) => {
    setPanValue(e.target.value);
  };

  return (
    <>
      {'Pan'}
      <Slider
        aria-label="Steps"
        defaultValue={0.0}
        step={0.05}
        min={-1.0}
        max={1.0}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
      />
      {getPanValueFromBar(panValue, panFilter)}
    </>
  );
};

export default PanSlider;
