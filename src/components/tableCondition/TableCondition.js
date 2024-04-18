import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import './style.css';
import { useEffect, useState } from 'react';
import { conditions } from '../../test/test';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';


export const TableCondition = () => {

    const [rows, setrows] = useState(conditions);

    useEffect(() => {
        setrows(conditions)
    }, [conditions])


    return (<div className="commponent">
        <div className="table-conditions">
            <TableContainer className='container'>
                <Table>
                    <TableHead>
                        <TableRow className='row-heads'>
                            <TableCell>FLOTA</TableCell>
                            <TableCell>CONDICION</TableCell>
                            <TableCell>NIVEL</TableCell>
                            <TableCell>CRITICO</TableCell>
                            <TableCell>SONIDO</TableCell>
                            <TableCell>NOTIFICACION</TableCell>
                            <TableCell>EMAILS</TableCell>
                            <TableCell>DETAIL</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => {
                            return (
                                <TableRow key={`${i}-Row`}>
                                    <TableCell>{row.FLOTA}</TableCell>
                                    <TableCell>{row.CONDICION}</TableCell>
                                    <TableCell>{row.NIVEL}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={row.CRITICO} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={row.SONIDO} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={row.NOTIFICACION} disabled />
                                    </TableCell>
                                    <TableCell>{row.EMAILS.join(', ')}</TableCell>
                                    <TableCell><VisibilityIcon></VisibilityIcon></TableCell>
                                    <TableCell><DeleteIcon></DeleteIcon></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>)
}

/*--flota, condicion, nivel, critico, sonido, notificacion, emails => detalles*/