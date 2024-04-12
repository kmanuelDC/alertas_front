import React, { useEffect, useState } from 'react';
import './style.css';
import { DateTimeInput } from '../../components/dates/InputDate';
import { Button } from '@mui/material';
import { TableComponent } from '../../components/table/table';
import { DownloadIcon } from '../../components/icons/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterTable } from '../../components/filters/filters';

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);


  useEffect(() => {
    console.log(open)
  }, [open])

  const openModal = ()=>{
    setOpen(true)
  }



  return (
    <div className='page-total'>
      <div className="bg-white">
        <div className="items-center">
          <div className='button'>
            <Button className="bg-blue" onClick={openModal} endIcon={<FilterListIcon />}>
              FILTERS
            </Button>
          </div>
          <div className="dates">
            <div className='time-input' >
              <DateTimeInput name="Fecha Inicio" />
            </div>
            <div className='time-input' >
              <DateTimeInput name="Fecha Fin" />
            </div>
          </div>
          <div className="icon-download">
            <DownloadIcon className="down" />
          </div>
        </div>
        <br></br>
        <div className="table-component">
          <TableComponent />
        </div>
        <div>
        </div>
      </div>
      <FilterTable open={open} setOpen={setOpen}></FilterTable>
    </div>
  )
}

