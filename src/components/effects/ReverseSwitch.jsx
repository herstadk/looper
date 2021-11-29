import React, { useState } from 'react';
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import { Colors } from '../../styles/colors.js';
import '../../styles/editStyle.css';

const ReverseSwitch = (props) => {
    const {player, reverseAudio} = props;
    const [checked, setChecked] = useState(false);

    const handleSwitchChange = () => {
        setChecked(!checked);
        reverseAudio(player, !checked);
    };

    return (
        <div class="editTool">
        <FormControlLabel 
            control={<Switch 
                onChange={handleSwitchChange} 
                checked={checked} 
                size="small"
                sx={{
                    '& .MuiSwitch-colorPrimary': {
                      color: Colors.green,
                    },
                  }}/>} 
            label="Reverse"
        />
        </div>
    );
};


export default ReverseSwitch;