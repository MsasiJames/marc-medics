import React, { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography, Container, Card, CardContent, Input, Textarea, Button, FormControl, FormLabel, Snackbar } from '@mui/joy';
import Header from '../components/topNavBar copy';
import Footer from '../components/footer';
import dna from '../images/dna-23.jpg';

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'primary' });

  const handleSubmit = (event) => {
    event.preventDefault();
      fetch('https://marc-medics-backend-dot-xenon-lyceum-442506-i4.as.r.appspot.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message })
      })
      .then((res) => {
        if(res.ok){
          setSnackbar({ open: true, message: 'Message sent successfully!', color: 'success' });
          // Clear form fields
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        } else {
          setSnackbar({ open: true, message: 'Failed to send message. Please try again.', color: 'danger' });
        }
      })
      .catch((error) => {
        console.error('Error while sending form:', error);
        setSnackbar({ open: true, message: 'An error occurred. Please try again later.', color: 'danger' });
      });
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
          zIndex: -1,
        },
      }}>
        <Header />
        
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
          <Card variant="outlined" sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}>
            <CardContent>
              <Typography level="h2" component="h2" sx={{ mb: 4, fontFamily: 'display', color: 'primary.500', textAlign: 'center' }}>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Name</FormLabel>
                  <Input 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      '&:focus-within': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Email</FormLabel>
                  <Input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      '&:focus-within': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Subject</FormLabel>
                  <Input 
                    required 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      '&:focus-within': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel sx={{color: 'white'}}>Message</FormLabel>
                  <Textarea 
                    minRows={4} 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      '&:focus-within': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                    }}
                  />
                </FormControl>
                <Button 
                  type="submit" 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'primary.500',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.600' },
                  }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </Box>
      
      <Snackbar
        autoHideDuration={5000}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        color={snackbar.color}
        variant="soft"
      >
        {snackbar.message}
      </Snackbar>
    </CssVarsProvider>
  );
}

