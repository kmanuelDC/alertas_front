import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Badge from '@mui/material/Badge';
import { ChevronRightIcon } from '../icons/icons';
import './style.css'
import { Button } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const TableComponent = () => {

    return (<TableContainer className='table-container'>
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
                    <TableCell>CONDITION</TableCell>
                    <TableCell>GPS</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">
                        <Badge variant="secondary">793D</Badge>
                    </TableCell>
                    <TableCell>CA15</TableCell>
                    <TableCell>02:31:35 18/03/2024</TableCell>
                    <TableCell>----</TableCell>
                    <TableCell>Warning</TableCell>
                    <TableCell>Presion en alta</TableCell>
                    <TableCell>---</TableCell>
                    <TableCell>CONDORPUZA EDWIN</TableCell>
                    <TableCell>ACTIVO</TableCell>
                    <TableCell>fleet_acarreo</TableCell>
                    <TableCell>
                        <LocationOnIcon className="location" />
                        <TimelineIcon className="timeline" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">
                        <Badge variant="secondary">793D</Badge>
                    </TableCell>
                    <TableCell>CA15</TableCell>
                    <TableCell>02:31:35 18/03/2024</TableCell>
                    <TableCell>----</TableCell>
                    <TableCell>Warning</TableCell>
                    <TableCell>Presion en alta</TableCell>
                    <TableCell>---</TableCell>
                    <TableCell>CONDORPUZA EDWIN</TableCell>
                    <TableCell>ACTIVO</TableCell>
                    <TableCell>fleet_acarreo</TableCell>
                    <TableCell>
                        <LocationOnIcon className="location" />
                        <TimelineIcon className='timeline'/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost">1</Button>
          <Button variant="ghost">2</Button>
          <Button variant="ghost">3</Button>
          <Button variant="ghost">4</Button>
          <Button variant="ghost">5</Button>
          <Button variant="ghost">6</Button>
          <Button variant="ghost">7</Button>
          <Button variant="ghost">8</Button>
          <Button variant="ghost">9</Button>
          <Button variant="ghost">10</Button>
          <ChevronRightIcon className="text-[#1e293b]" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">total: 68000</span>
          <Button className="bg-[#1e293b] text-white" variant="secondary">
            CSV
          </Button>
        </div>
        </div>
    </TableContainer>)
}