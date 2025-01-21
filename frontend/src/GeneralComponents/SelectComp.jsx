import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComp = ({ title, options }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120, bgcolor: 'lightgrey', borderRadius: 8 }} size='small'>
        <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={handleChange}
        >
          {options.map((ele, i) => (
            <MenuItem value={ele} key={i}>{ele}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectComp