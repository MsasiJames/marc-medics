/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, CircularProgress, Snackbar, Alert } from '@mui/material'

import AdminLoader from '../loaders/adminLoader';
import { isMobile } from "react-device-detect";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const loginFunction = async () => {
        console.log(username, password);
        setLoading(true);
      
        try {
          const response = await fetch('https://marc-medics-backend-dot-xenon-lyceum-442506-i4.as.r.appspot.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
      
          if (!response.ok) {
            // Handle server errors
            const errorData = await response.json();
            console.log('Error occurred: ', errorData.message);
            setSnackbarMessage(errorData.message || 'An error occurred');
            setOpenSnackbar(true);
            return;
          }
      
          const data = await response.json();
          console.log('Login successful:', data.message);
          localStorage.setItem('token', data.token);
          navigate('/adminHome');
        } catch (error) {
          // Handle network or unexpected errors
          console.error('An error occurred:', error.message);
          setSnackbarMessage('Network or unexpected error occurred');
          setOpenSnackbar(true);
        } finally {
          setLoading(false);
        }
    };
      
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>

            {/* Loader animation */}
            <Box sx={{
                marginY: 15
            }}>
                <AdminLoader />
            </Box>
            
            <TextField 
                placeholder="Username" 
                variant="outlined"
                size='small'
                sx={{
                    my: 1
                }}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <TextField 
                placeholder="Password"
                type='password' 
                variant="outlined"
                size='small'
                sx={{
                    my: 1
                }}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />

            <Button variant="outlined" onClick={loginFunction} disabled={loading} size='small'>
                {loading ? <CircularProgress /> : 'login'}
            </Button>

            {/* Snackbar for error messages */}
            <Snackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                autoHideDuration={6000}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setOpenSnackbar(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default LoginPage;
