import React, { useState } from 'react'
import { Button } from '@mui/material'
import { BellIcon, IconToogle, PlusIcon, SlidersIcon } from '../../components/icons/icons'
import './style.css'
import { TableCondition } from '../../components/tableCondition/TableCondition'
import { NewCondition } from '../../components/condition/condition'


let initialButtons = [
    { name: 'All Rules', selected: true, icon: <IconToogle /> },
    { name: 'Create New Rule', selected: false, icon: <PlusIcon /> }
]
export const ConfigurationPage = () => {

    const [buttonSelected, setButtonSelected] = useState(initialButtons);
    // useEffect(() => {
    //     console.log('hola mundo')
    // }, [first])

    const selectedComponent = (index) => {
        setButtonSelected([...buttonSelected.map((x, i) => { return i === index ? { ...x, selected: true } : { ...x, selected: false } })])
    }


    return (
        <div className='page-configuration'>
            <div className="bg-white">
                <div className="items-center">
                    <div className='box'>
                        <div className='header'>
                            <div className='tittle'>
                                <SlidersIcon style={{ 'marginLeft': '10px' }} />
                                <h4 className='text'>LOGICAL CONDITIONS</h4>
                                <Button className="rounded" size="icon" variant="outline">
                                    <BellIcon />
                                </Button>
                            </div>
                        </div>
                        <div className='body'>
                            <div className='left'>
                                <div className='box-1'>
                                    {buttonSelected.map((item, index) => {
                                        return (<div className={`${item.selected ? 'selected' : 'no-selected'}`} key={`sel-${index}`} onClick={() => selectedComponent(index)}>
                                            {item.icon}
                                            <div className='name'>{item.name}</div>
                                        </div>)
                                    })}
                                </div>
                            </div>
                            <div className='rigth'>
                                {buttonSelected[0].selected ? <TableCondition /> : <></>}
                                {buttonSelected[1].selected ? <NewCondition /> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}