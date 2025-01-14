import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography, Sheet, Container, Card, CardContent, Input, Textarea, Button, FormControl, FormLabel } from '@mui/joy';

// Assume the image is imported correctly
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
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
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1,
        },
      }}>
        {/* Header */}
        <Sheet
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            px: 4,
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: 'sm',
          }}
        >
          <Typography level="h4" component="h1" sx={{ fontFamily: 'display', fontWeight: 'bold', color: 'primary.700' }}>
            MARC Medical
          </Typography>
        </Sheet>

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
          <Card variant="outlined" sx={{ bgcolor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(8px)' }}>
            <CardContent>
              <Typography level="h2" component="h2" sx={{ mb: 4, fontFamily: 'display', color: 'primary.700', textAlign: 'center' }}>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Name</FormLabel>
                  <Input color='primary' required />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" required />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Message</FormLabel>
                  <Textarea minRows={4} required />
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
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Container maxWidth="lg">
            <Typography textAlign="center" sx={{ color: 'text.primary' }}>
              © 2023 MARC Medical. All rights reserved.
            </Typography>
          </Container>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

