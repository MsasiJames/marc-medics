import React from 'react';

import { Typography } from '@mui/joy';
import '../loaders/adminLoader.css'

function AdminLoader() {
  return (
    <div id="page">
        <div id="container">
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <div id="ring"></div>
            <Typography sx={{ fontWeight: 'bold', fontSize: 15}}>Admin Login</Typography>
        </div>
    </div>
  )
}

export default AdminLoader