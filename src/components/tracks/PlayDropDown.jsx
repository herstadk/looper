import {useState, useEffect} from 'react';
import React from 'react';
import { getBlobNames, getBlobByChoice } from '../../utils/blobs';
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

    // push selected track up?
    /* 
    useEffect(() => {
        console.log("Selected track: ", selectedTrack)
        // get blob name
        //let tempBlob = getBlob(selectedTrack)
        async function getTheBlob() {
            const tempBlob = await getBlobByChoice(selectedTrack)

            //console.log("will load",tempBlob)
            // set audio source to the temp blob
            //setLoadedBlob(tempBlob);
        }
        getTheBlob();

    }, [selectedTrack])
    */
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
