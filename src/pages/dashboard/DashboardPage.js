import React, { useEffect, useState } from 'react';
import './style.css';
import { DateTimeInput } from '../../components/dates/InputDate';
import { Button } from '@mui/material';
import { TableComponent } from '../../components/table/table';
import { DownloadIcon } from '../../components/icons/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterTable } from '../../components/filters/filters';
import dayjs from 'dayjs';

export const DashboardPage = () => {
  const [open, setOpen] = useState(false);

  const [initime, setinitime] = useState(dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'));
  const [endtime, setendtime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const [exportCSV, setexportCSV] = useState(false)

  // useEffect(() => {
  //   console.log(open)
  // }, [open])

  const openModal = () => {
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
              <DateTimeInput name="Fecha Inicio" date={initime} setdate={setinitime} />
            </div>
            <div className='time-input' >
              <DateTimeInput name="Fecha Fin" date={endtime} setdate={setendtime} />
            </div>
          </div>
          <div className="icon-download">
            <DownloadIcon className="down" onClick={() => setexportCSV(true)} />
          </div>
        </div>
        <br></br>
        <div className="table-component">
          <TableComponent
            exportCSV={exportCSV}
            setexportCSV={setexportCSV} />
        </div>
        <div>
        </div>
      </div>
      <FilterTable open={open} setOpen={setOpen}></FilterTable>
    </div>
  )
}

