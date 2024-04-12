import { Drawer, Grid, Button } from '@mui/material'
import './style.css'
import { SelectMenu } from './select';



export const FilterTable = ({ open, setOpen }) => {

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <div>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}>
                <div className='container'>
                    <Grid item xs={12} className="left-container">
                        <Grid className="tittle" item xs={12} >
                            <div>SELECCIONE PARAMETROS</div>
                        </Grid>
                        <Grid item xs={12} >
                            <div className='filters'>
                                <SelectMenu name={'FLOTA'} value={""} />
                                <SelectMenu name={'EQUIPO'} value={""} />
                                <SelectMenu name={'CRITICIDAD'} value={""} />
                                <SelectMenu name={'TIPO '} value={""} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className='button-search' onClick={toggleDrawer(false)}> BUSCAR </Button>
                        </Grid>
                    </Grid>
                </div>
            </Drawer>
        </div>)
}