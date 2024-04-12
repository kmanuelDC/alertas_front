import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './style.css';

export const DateTimeInput = ({ name }) => {
    const [dateTime, setDateTime] = useState('');

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };

    return (

        <TextField
            label={name}
            type="datetime-local"
            value={dateTime}
            onChange={handleDateTimeChange}
            InputLabelProps={{
                shrink: true,
            }}
            className='input-date'
        />
    );
}
