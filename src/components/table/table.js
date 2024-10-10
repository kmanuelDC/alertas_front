import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Badge from '@mui/material/Badge';
// import { ChevronRightIcon } from '../icons/icons';
import './style.css'
// import { Button } from '@mui/material';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import { rows } from '../../test/test';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import PlaceIcon from '@mui/icons-material/Place';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import InsightsIcon from '@mui/icons-material/Insights';
import { EchartComponent } from '../echart/echartComponent';
import MapComponent from '../map/mapComponent';

const style_modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const TableComponent = ({ exportCSV, setexportCSV }) => {

    const [tableRows, settableRows] = useState(rows);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [dataGraphic, setDataGraphic] = useState([]);
    const [isGraphic, setisGraphic] = useState(true);
    const [dataMap, setdataMap] = useState({})

    const rowsPerPage = 10;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableRows.slice(indexOfFirstRow, indexOfLastRow);


    useEffect(() => {
        const sortedRows = [...rows].sort((a, b) => new Date(b.FECHA_EVENTO) - new Date(a.FECHA_EVENTO));
        settableRows(sortedRows);
    }, [rows]);

    useEffect(() => {
        if (exportCSV) { exportToCSV(rows) }
        setexportCSV(false)
    }, [exportCSV])


    const exportToCSV = (rows) => {
        const headers = ['FLOTA', 'EQUIPO', 'FECHA_EVENTO', 'NIVEL_ALERTA', 'DESCRIPCION', 'DURACION', 'WORKER', 'ESTADO'];
        let moment = dayjs().format('YYYY-MM-DD HH:mm:ss')
        // Crear los datos CSV
        const csvRows = [
            headers.join(','), // Encabezado
            ...rows.map(row => [
                row.FLOTA,
                row.EQUIPO,
                row.FECHA_EVENTO,
                row.NIVEL_ALERTA,
                row.DESCRIPCION,
                row.DURACION,
                row.WORKER,
                row.ESTADO
            ].join(','))
        ].join('\n');

        // Crear un enlace para descargar el CSV
        const blob = new Blob([csvRows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Data-Export-${moment}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleClose = () => {
        setOpen(false)
    }

    const openGraphic = (data) => {
        setOpen(true)
        setDataGraphic(data)
        setisGraphic(true)
    }

    const openMap = (data, item) => {
        console.log(item)
        setOpen(true)
        setisGraphic(false)
        setdataMap({ ...data, level: item.NIVEL_ALERTA, worker: item.WORKER, equip: item.EQUIPO, duration: item.DURACION, description: item.DESCRIPCION })
    }

    return (
        <div className='dashboard-page'>
            <TableContainer className='table-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>FLOTA</TableCell>
                            <TableCell>EQUIPO</TableCell>
                            <TableCell>FECHA DE EVENTO</TableCell>
                            <TableCell>NIVEL ALERTA</TableCell>
                            <TableCell>DESCRIPCION</TableCell>
                            <TableCell>DURACIÓN</TableCell>
                            <TableCell>WORKER</TableCell>
                            <TableCell>ESTADO</TableCell>
                            <TableCell>GRAFICA</TableCell>
                            <TableCell>GPS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            currentRows.map((x, i) => {
                                // console.log(x)
                                return (<TableRow key={`row-${i}`}>
                                    <TableCell>{x.FLOTA}</TableCell>
                                    <TableCell>{x.EQUIPO}</TableCell>
                                    <TableCell>{x.FECHA_EVENTO}</TableCell>
                                    <TableCell>{x.NIVEL_ALERTA}</TableCell>
                                    <TableCell>{x.DESCRIPCION}</TableCell>
                                    <TableCell>{x.DURACION}</TableCell>
                                    <TableCell>{x.WORKER}</TableCell>
                                    <TableCell>{x.ESTADO}</TableCell>
                                    <TableCell><InsightsIcon style={{
                                        cursor: 'pointer'
                                    }} onClick={() => openGraphic(x?.GRAFICO)} /></TableCell>
                                    <TableCell><PlaceIcon style={{
                                        cursor: 'pointer'
                                    }} onClick={() => openMap(x?.GPS, x)} /></TableCell>
                                </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
                <div className="flex-section-bottom">
                    <div className='section-rigth'>
                        <div className='pagination'>
                            <Stack spacing={2} >
                                {/* <Typography>Page: {currentPage}</Typography> */}
                                <Pagination count={10} page={currentPage} onChange={handleChange} color='primary' size="large" />
                            </Stack>
                        </div>
                        <div className="items-text">
                            <span className="text-sm">TOTAL: {tableRows.length}</span>
                        </div>
                    </div>
                </div>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style_modal, width: 1000 }}>
                    <h1 id="parent-modal-title">{dataMap.description}</h1>
                    {isGraphic ? <>
                        <h2 id="parent-modal-title">GRAFICA HISTORICA ALERTA</h2>
                        <EchartComponent data={dataGraphic} /></> :
                        <>
                            <h2 id="parent-modal-title">UBICACION HISTORICA ALERTA</h2>
                            <MapComponent data={dataMap}></MapComponent>
                        </>}

                </Box>
            </Modal>
        </div>)
}