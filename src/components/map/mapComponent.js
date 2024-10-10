import React, { useState } from 'react';
// import { Button } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import marker1 from "../../assets/img/makers/marker-1.png";
import marker2 from "../../assets/img/makers/marker-2.png";
import marker3 from "../../assets/img/makers/marker-3.png";

import BtnMap from "../../assets/img/map/btnMap.png";
import BtnSatellite from "../../assets/img/map/btnSatellite.png";
import { Button } from '@mui/material';
import './style.css'


const MapComponent = ({ data }) => {
    const position = [data?.lat, data?.lon]; // Coordenadas iniciales del mapa
    const [typeMap, setTypeMap] = useState('satellite');
    console.log(data)

    const setIcon = (icon_type, height, width) => {
        return new L.Icon({ iconUrl: icon_type, iconSize: [height, width] })
    }

    const setIconTypeAlarm = (lvlAlarm) => {

        // switch (parseInt(lvlAlarm)) {
        switch (lvlAlarm) {
            case 'NORMAL':
                return setIcon(marker1, 30, 35)
                break;
            case 'WARNING':
                return setIcon(marker2, 30, 35)
                break;
            case 'CRITICAL':
                return setIcon(marker3, 30, 35)
                break;
            default:
                return setIcon(marker1, 30, 35)
                break;
        }
    }

    return (
        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
            {/* Capa de mosaicos (tiles) para mostrar el mapa */}
            <TileLayer url={`${typeMap === 'satellite' ? 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}`} />

            {/* Marcador con tooltip */}
            {/* <Marker position={position} icon={L.icon({ iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png" })}> */}
            <Marker position={position} icon={setIconTypeAlarm(data?.level)}>
                <Popup>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>{`${data.worker}`}</div>
                        <div>{`${data.equip}`}</div>
                        <div>{`${data.duration}`}</div>
                    </div>
                </Popup>

            </Marker>

            <div className='div-change-style-map'>
                <Button onClick={() => {
                    setTypeMap(typeMap === 'satellite' ? 'map' : 'satellite')
                }}
                    style={{
                        backgroundImage: `url(${typeMap === 'satellite' ? BtnMap : BtnSatellite})`,
                        color: `${typeMap === 'satellite' ? '#4D5052' : '#FAFAFA'}`
                    }}
                    classes={{ label: 'label-button' }} className='btn-type-map'
                    variant="contained">{typeMap === 'satellite' ? 'MAP' : 'Satellite'}</Button>
            </div>
        </MapContainer>
    );
};

export default MapComponent;
