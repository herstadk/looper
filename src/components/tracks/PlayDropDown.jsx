import { useState, useEffect } from 'react';
import React from 'react';
import { getBlobNames } from '../../utils/blobs';
import Select from 'react-select';

const PlayDropdown = (props) => {
  const { setAudioSelection } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getTracks() {
      const response = await getBlobNames();
      setItems([...response]);
    }

    getTracks();
  }, []);

  const clickResult = (e) => {
    setAudioSelection(e.label);
  };

  return (
    <div>
      <Select options={items} onChange={clickResult} />
    </div>
  );
};

export default PlayDropdown;
