import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComp = ({ title, options, style, handleChange }) => {

  return (
    <div>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 120, bgcolor: style?.bg, borderRadius: style?.rounded }} size='small'>
        <InputLabel>{title}</InputLabel>
        <Select
          defaultValue={title ? '' : options[0]}
          onChange={handleChange}
          sx={{ color: style?.color, fontSize: style?.font }}
          hiddenLabel={title ? false : true}
        >
        {options.map((ele, i) => (
          <MenuItem value={ele} key={i}>{ele}</MenuItem>
        ))}
      </Select>
    </FormControl>
    </div >
  )
}

export default SelectComp