import React, { useState } from 'react';
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';


const ReverseSwitch = (props) => {
    const {player, reverseAudio} = props;
    const [checked, setChecked] = useState(false);

    const handleSwitchChange = () => {
        setChecked(!checked);
        reverseAudio(player, !checked);
    };

    return (
        <FormControlLabel 
            control={<Switch onChange={handleSwitchChange} checked={checked} />} 
            label="Reverse"
        />
    );
};


export default ReverseSwitch;