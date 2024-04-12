import React, {  useCallback, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';



const style = {
    position: 'absolute',
    top: '45%',
    // left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #FFFF',
    boxShadow: 24
};

export const ContainerModal = ({ open, handleClosed, children, height, width, minWidth, minHeight }) => {

    const handleEscKey = useCallback((event) => {
        if (event.key === 'Escape') {
            handleClosed();
        }
    }, [handleClosed])

    useEffect(() => {
        if (open) {
            // Agregar el event listener cuando el modal se abre
            document.addEventListener('keydown', handleEscKey);
        } else {
            // Remover el event listener cuando el modal se cierra
            document.removeEventListener('keydown', handleEscKey);
        }

        // Limpiar el event listener al desmontar el componente
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [open, handleClosed, handleEscKey]);

    return (
        <div className='modal-component'>
            <Modal
                open={open}
                onClose={handleClosed}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, borderRadius: 5, minWidth: minWidth, minHeight: minHeight }}>
                    {children}
                </Box>
            </Modal>
        </div>
    )

}


