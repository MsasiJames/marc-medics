import React, { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography, Sheet, Container, Card, CardContent, Input, Textarea, Button, FormControl, FormLabel } from '@mui/joy';

// Top navigation bar
import Header from '../components/topNavBar copy';

// Background image
import dna from '../images/dna.png';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e8f5fe',
          100: '#b9e2fc',
          200: '#8acefa',
          300: '#5bbaf8',
          400: '#2ca6f6',
          500: '#0d93e3',
          600: '#0a72b1',
          700: '#07527f',
          800: '#04324d',
          900: '#01121b',
        },
        background: {
          body: '#ffffff',
          surface: '#f8fafc',
        },
      },
    },
  },
  fontFamily: {
    body: "'Roboto', sans-serif",
    display: "'Montserrat', sans-serif",
  },
});

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    fetch('http://127.0.0.1:8080/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "subject": subject,
        "message": message
      })
    })
    .then((res) => {
      if(res.ok){
        console.log('Form sent successfully');
      }else{
        console.log('Form was not sent successfully');
      }
    })
    .catch((error) => {
      console.error('Error while sending form:', error);
    })
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dna})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 100%',
          // opacity: 0.2,
          zIndex: -1,
        },
      }}>
        {/* Header */}
        <Header />
        

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
          <Card variant="outlined" sx={{ bgcolor: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(20px)' }}>
            <CardContent>
              <Typography level="h2" component="h2" sx={{ mb: 4, fontFamily: 'display', color: 'primary.500', textAlign: 'center' }}>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Name</FormLabel>
                  <Input required onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Email</FormLabel>
                  <Input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Subject</FormLabel>
                  <Input required onChange={(e) => setSubject(e.target.value)} />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Message</FormLabel>
                  <Textarea minRows={4} required onChange={(e) => setMessage(e.target.value)}/>
                </FormControl>
                <Button type="submit" sx={{ width: '100%' }}>Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </Container>

        {/* Footer */}
        <Sheet
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            bgcolor: 'rgba(255, 255, 255, 0)',
            // backdropFilter: 'blur(8px)',
          }}
        >
          <Container maxWidth="lg">
            <Typography level='body-sm' textAlign="center" sx={{ color: 'white' }}>
              © 2023 MARC Medical. All rights reserved.
            </Typography>
          </Container>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

