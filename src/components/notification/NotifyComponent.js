import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const NotifyAlert = ({ open, handleClose, severity, children }) => {


    useEffect(() => {
        let timer;
        if (open) {
            timer = setTimeout(() => {
                handleClose()
            }, 5000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [open, handleClose]);

    return (<>
        <Stack spacing={3} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={5000} onClose={() => handleClose()}>
                <MuiAlert elevation={6} severity={severity === true ? 'success' : 'error'} variant="filled">
                    {children}
                </MuiAlert>
            </Snackbar>
        </Stack>
    </>)

}