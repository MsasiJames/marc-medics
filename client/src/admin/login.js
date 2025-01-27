/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input } from '@mui/joy'

import AdminLoader from '../loaders/adminLoader';


function LoginPage() {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const loginFunction = async () => {
        console.log(username, password);
      
        try {
          const response = await fetch('http://127.0.0.1:8080/login', {
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
            return;
          }
      
          const data = await response.json();
          console.log('Login successful:', data.message);
          localStorage.setItem('token', data.token);
          navigate('/adminHome')
        } catch (error) {
          // Handle network or unexpected errors
          console.error('An error occurred:', error.message);
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
        

        <Input 
            placeholder="Username" 
            variant="outlined"
            sx={{
                my: 1
            }}
            onChange={(e) => {
                setUsername(e.target.value);
            }}
        />
        <Input 
            placeholder="Password"
            type='password' 
            variant="outlined"
            sx={{
                my: 1
            }}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
        />

        <Button variant="soft" onClick={loginFunction}>
            Login
        </Button>

    </Box>
  )
}

export default LoginPage