import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Box, Chip, Card, CardContent, Stack, Button, Checkbox, Modal } from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/conditionActions';
import './style.css';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TableCondition = () => {
    const [page, setPage] = useState(1); // Página empieza en 1 para el usuario
    const rowsPerPage = 5;
    const [paginatedRows, setPaginatedRows] = useState([]);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const { conditions, condition } = useSelector(state => state.condition);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAllConditions());
    }, [dispatch]);

    useEffect(() => {
        const start = (page - 1) * rowsPerPage; // Página 1 muestra índices 0-4
        const end = start + rowsPerPage;
        setPaginatedRows(conditions.slice(start, end)); // Usa slice en lugar de filter
    }, [conditions, page, rowsPerPage]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleOpenDetailModal = (id) => {
        dispatch(actions.getConditionByID(id));
        setOpenDetailModal(true);
    };

    const handleOpenDeleteModal = (id) => {
        setOpenDeleteModal(true);
        setIdToDelete(id);
    };

    const handleDeleteCondition = () => {
        if (idToDelete) {
            dispatch(actions.deleteContidionByID(idToDelete));
            setOpenDeleteModal(false);
            setIdToDelete(null);
        }
    };

    const handleCloseModal = () => {
        setOpenDetailModal(false);
        setOpenDeleteModal(false);
        setIdToDelete(null);
    };

    return (
        <div className="component">
            <div className="table-conditions">
                <TableContainer className="container">
                    <Table>
                        <TableHead>
                            <TableRow className="row-heads">
                                {['FLOTA', 'CONDICION', 'NIVEL', 'CRITICO', 'SONIDO', 'NOTIFICACION', 'EMAILS', 'DETAIL', ''].map((head) => (
                                    <TableCell key={head}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row, i) => (
                                <TableRow key={`${i}-Row`}>
                                    <TableCell>{row[2]}</TableCell>
                                    <TableCell>{row[1]}</TableCell>
                                    <TableCell>{row[3]}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={row[4]} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={row[5]} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={row[6]} disabled />
                                    </TableCell>
                                    <TableCell>{row[7]?.join(', ')}</TableCell>
                                    <TableCell>
                                        <VisibilityIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOpenDetailModal(row[0])}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOpenDeleteModal(row[0])}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Pagination
                className="table-pagination"
                count={Math.ceil(conditions.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
            />

            <Modal
                open={openDetailModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2>{condition?.fleet}</h2>
                    <div className="second-line">
                        <h3>{condition?.name}</h3>
                        <Chip
                            style={{ backgroundColor: `#${condition?.color}`, color: 'white' }}
                            label={condition?.level}
                        />
                    </div>
                    <div className="conditions">
                        {condition && Object.entries(condition.rules || {}).map(([key, value], i) => (
                            <React.Fragment key={`rule-${i}`}>
                                <Card sx={{ background: 'white', borderRadius: '1em', margin: '.5em 0' }}>
                                    <CardContent>
                                        <Stack direction="row" spacing={1}>
                                            {value.map((r, ri) => (
                                                <React.Fragment key={`chip-${ri}`}>
                                                    <Chip label={`${r[8]} ${r[9]} ${r[10]}`} />
                                                    {ri !== value.length - 1 && (
                                                        <Chip
                                                            style={{ backgroundColor: 'black', color: 'white' }}
                                                            label={r[11] === 1 ? 'AND' : 'OR'}
                                                        />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                                {i !== Object.entries(condition.rules || {}).length - 1 && (
                                    <Chip
                                        style={{ backgroundColor: 'black', color: 'white', marginLeft: '20px' }}
                                        label={condition.operatorRule === 1 ? 'AND' : 'OR'}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <Button
                        style={{
                            margin: '20px auto 10px auto',
                            backgroundColor: '#055a82',
                            color: 'white',
                            minWidth: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={handleCloseModal}
                    >
                        CLOSE
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={openDeleteModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h3>Are you sure you want to delete this condition?</h3>
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Button
                            style={{
                                backgroundColor: '#0e662d',
                                color: 'white',
                                minWidth: '150px',
                            }}
                            onClick={handleDeleteCondition}
                        >
                            SAVE
                        </Button>
                        <Button
                            style={{
                                backgroundColor: '#055a82',
                                color: 'white',
                                minWidth: '150px',
                            }}
                            onClick={handleCloseModal}
                        >
                            CLOSE
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};
