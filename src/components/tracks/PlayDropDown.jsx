import {useState, useEffect} from 'react';
import React from 'react';
import { getBlobNames } from '../../utils/blobs';
import Select from 'react-select';

const PlayDropdown = (props) => {

    const {childToParent} = props;
    const [selectedTrack, setSelectedTrack] = useState(undefined);

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getTracks() {
            const response = await getBlobNames();
            
            console.log("Response:", response)
            setItems([...response])
        }

        getTracks();
    }, [])

    const clickResult = (e) => {
        console.log("Clicked for result: ", e);
        console.log(e);
        setSelectedTrack(e.label);
    }

    return (
        <div>
            <Select
                options={items}
                onChange={clickResult}
            />
            {childToParent(selectedTrack)}
        </div>
    )
}

export default PlayDropdown
