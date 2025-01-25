import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const WithdrawComp= ({ title, options, style, size = true, min = true, max, onChange, prefillVal, preVal }) => {
  const [value, setValue] = useState(prefillVal ? preVal : '');

  useEffect(() => {
    if (prefillVal) {
      setValue(preVal);
    }
  }, [prefillVal, preVal]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div>
      <FormControl
        variant="filled"
        sx={{
          m: 1,
          minWidth: min ? 120 : max,
          bgcolor: style?.bg,
          borderRadius: style?.rounded,
        }}
        size={size ? 'small' : 'medium'}
      >
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          sx={{ color: style?.color, fontSize: style?.font }}
          hiddenLabel={title ? false : true}
        >
          {options.map((ele, i) => (
            <MenuItem value={ele} key={i}>
              {ele}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default WithdrawComp;
