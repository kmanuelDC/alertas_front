import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import './style.css';
import { useEffect, useMemo, useState } from 'react';
import { conditions } from '../../test/test';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const TableCondition = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setRows(conditions);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return rows.slice(start, end);
    }, [rows, page, rowsPerPage]);

    return (
        <div className="component">
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
                            {paginatedRows.map((row, i) => (
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
                                    <TableCell><VisibilityIcon /></TableCell>
                                    <TableCell><DeleteIcon /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
