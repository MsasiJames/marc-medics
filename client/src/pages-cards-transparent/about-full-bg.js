import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography, Grid, Card, CardContent, Container, List, ListItem, ListItemDecorator } from '@mui/joy';
import { MapPin, Phone, Mail, Check } from 'lucide-react';

// Top navigation bar
import Header from '../components/topNavBar copy';
import Footer from '../components/footer';

// background image
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

const services = [
  "General Practice", "Multi Specialty Practice", "Aesthetics/Cosmetic Surgery", "Dermatology",
  "Ear, Nose and Throat (ENT)", "Ophthalmology", "Cardiology", "Oncology", "Neurology",
  "Psychiatry", "Obstetrics and gynaecology", "Fertility", "Pediatrics", "General Surgery",
  "Orthopaedics", "Urology", "Dentistry/Orthodontics", "Anti-aging", "Geriatric Medicine",
  "Pain Care Management", "Wellness and Complementary Medicine"
];

export default function About() {
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
          zIndex: -1,
          bgcolor: 'rgba(255, 255, 255, 0.1)'
        },
      }}>
        {/* Top Navbar */}
        <Header />
    

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, bgcolor: 'rgba(255, 255, 255, 0)' }}>
          <Grid container spacing={4}>
            {/* About MARC Medical */}
            <Grid xs={12} md={6}>
              <Card variant="outlined" 
                  sx={{ 
                    height: '100%', 
                    bgcolor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(20px)',
                    // background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
                    // backdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                    '&:hover': {
                      transform: 'translateY(-10px)', 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}>
                <CardContent>
                  <Typography level="h3" component="h2" sx={{ mb: 2, fontFamily: 'display', color: 'primary.500' }}>
                    About MARC Medical
                  </Typography>
                  <Typography sx={{ mb: 2, color: 'white' }}>
                    Located in the heart of Manila in Makati, MARC Medical is a state-of-the-art treatment facility offering exclusive options from the best practitioners.
                  </Typography>
                  <List>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Fully equipped day case surgical center of excellence
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Exclusive treatment options from the best practitioners
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Conveniently situated in Centuria Medical Makati
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Location and Contact */}
            <Grid xs={12} md={6}>
              <Card variant="outlined" 
                  sx={{ 
                    height: '100%', 
                    // background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
                    // backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(20px)',
                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                    '&:hover': {
                      transform: 'translateY(-10px)', 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    }}>
                <CardContent>
                  <Typography level="h3" component="h2" sx={{ mb: 2, fontFamily: 'display', color: 'primary.500' }}>
                    Location & Contact
                  </Typography>
                  <List>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><MapPin color="white" /></ListItemDecorator>
                      Suite 2004, Centuria Medical Makati, Kalayaan Avenue, Makati City 1200, Philippines
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Phone color="white" /></ListItemDecorator>
                      +63 (2) 1234 5678
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Mail color="white" /></ListItemDecorator>
                      info@marcmedical.com
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Services */}
            <Grid xs={12}>
              <Card variant="outlined" 
                sx={{ 
                  // background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
                  // backdropFilter: 'blur(8px)',
                  bgcolor: 'rgba(255, 255, 255, 0)',
                  backdropFilter: 'blur(20px)',
                  transition: 'transform 0.3s ease-in-out', // Smooth transition
                    '&:hover': {
                      transform: 'translateY(-10px)', 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                 }}>
                <CardContent>
                  <Typography level="h3" component="h2" sx={{ mb: 2, fontFamily: 'display', color: 'primary.500' }}>
                    Our Services
                  </Typography>
                  <Typography sx={{ mb: 2, color: "white" }}>
                    MARC stem cell clinic Manila offers a wide range of medical services. In addition to our specialized treatments, we can arrange access to various other medical services within the same building:
                  </Typography>
                  <Grid container spacing={2}>
                    {services.map((service, index) => (
                      <Grid key={index} xs={12} sm={6} md={4}>
                        <ListItem sx={{color: 'white'}}>
                          <ListItemDecorator><Check color="white" /></ListItemDecorator>
                          {service}
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Facilities */}
            <Grid xs={12}>
              <Card variant="outlined" 
                  sx={{ 
                    // background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
                    // backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(20px)',
                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                    '&:hover': {
                      transform: 'translateY(-10px)', 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}>
                <CardContent>
                  <Typography level="h3" component="h2" sx={{ mb: 2, fontFamily: 'display', color: 'primary.500' }}>
                    Additional Facilities
                  </Typography>
                  <Typography sx={{ mb: 2, color: 'white' }}>
                    Centuria Medical Makati's healthcare services also include:
                  </Typography>
                  <List>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Day Surgery Center
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Radiology center
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Diagnostic laboratory
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Digital imaging
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Pharmacy
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Recovery suites
                    </ListItem>
                    <ListItem sx={{color: "white"}}>
                      <ListItemDecorator><Check color="white" /></ListItemDecorator>
                      Ambulance transfer service
                    </ListItem>
                  </List>
                  <Typography sx={{ mt: 2, color: "white" }}>
                    We can also arrange convenient hotel accommodations near our location for your stay.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </CssVarsProvider>
  );
}

