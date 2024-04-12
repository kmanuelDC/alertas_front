import React from "react"
import { MenuItem, Select } from "@mui/material"
import './style.css'

export const SelectMenu = ({value,handleChange,name}) => {


    return (<div className={`menu-input`}>
        <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            className="select"
        >
            <MenuItem value="" disabled>
                {name}
            </MenuItem>
            <MenuItem value={10}>Opción 1</MenuItem>
            <MenuItem value={20}>Opción 2</MenuItem>
            <MenuItem value={30}>Opción 3</MenuItem>
        </Select>
    </div>)
}