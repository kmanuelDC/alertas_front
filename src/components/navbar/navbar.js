import React from 'react';
import './style.css';
import { SettingsIcon } from '../icons/icons';
import { Link } from 'react-router-dom';


export const Navbar = () => {




    return (
        <div>
            <nav className='navbar'>
                <div className='title'>
                    <Link className='detail' to="/dashboard">ALARMAS PERSONALIZADAS</Link>
                </div>
                <div className='icon'>
                    <Link className='detail' to="/configuration"><SettingsIcon /></Link>
                </div>
                <div className='user-initials'>SD</div>

            </nav>
        </div>
        // </Router>
    );
}

