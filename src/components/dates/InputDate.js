import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './style.css';

export const DateTimeInput = ({ name, date, setdate }) => {
    // const [dateTime, setDateTime] = useState('');

    const handleDateTimeChange = (event) => {
        setdate(event.target.value);
    };

    return (

        <TextField
            label={name}
            type="datetime-local"
            value={date}
            onChange={handleDateTimeChange}
            InputLabelProps={{
                shrink: true,
            }}
            className='input-date'
        />
    );
}
