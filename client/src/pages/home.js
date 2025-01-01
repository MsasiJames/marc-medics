import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Button, Typography, Sheet, Grid, Card, CardContent, Divider, Container } from '@mui/joy';
import { MicroscopeIcon, HeartPulseIcon, BrainIcon, UserIcon, PhoneIcon, MailIcon } from 'lucide-react';

import Header from '../components/topNavBar';
import CarouselServices from '../components/rotatingServicecards';

// here the images are imported
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
  { title: 'Stem Cell Therapy', description: 'Cutting-edge treatments using stem cells for various conditions.', icon: <MicroscopeIcon /> },
  { title: 'Regenerative Medicine', description: 'Advanced techniques to help your body heal itself.', icon: <HeartPulseIcon /> },
  { title: 'Personalized Care', description: 'Tailored treatment plans for your specific needs.', icon: <UserIcon /> },
  { title: 'Neurological Treatments', description: 'Innovative stem cell therapies for neurological disorders.', icon: <BrainIcon /> },
  { title: 'Orthopedic Regeneration', description: 'Stem cell solutions for joint and bone health.', icon: <HeartPulseIcon /> },
];

export default function HomePage() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh', // Make it cover most of the initial screen
            color: 'common.white',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dna})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 100%',
              opacity: 1, // Increased opacity to make the background more visible
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(13,147,227,0.8) 0%, rgba(1,18,27,0) 50%)', // Added gradient overlay
            }}
          />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4}>
              <Grid xs={12} md={8}>
                <Typography level="h1" component="h2" sx={{ mb: 2, fontFamily: 'display', fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.5rem' }, color: 'white' }}>
                  Pioneering Stem Cell Therapies for a Healthier Tomorrow
                </Typography>
                <Typography sx={{ mb: 4, fontSize: { xs: 'md', md: 'lg' }, color: 'white' }}>
                  At Marc Medics, we're at the forefront of regenerative medicine, harnessing the power of stem cells to transform lives. Our cutting-edge therapies offer hope for those seeking innovative solutions to complex health challenges.
                </Typography>
                <Typography sx={{ mb: 4, fontSize: { xs: 'md', md: 'lg' }, color: 'white' }}>
                  Discover how our personalized treatments can help you unlock your body's natural healing potential and pave the way for a brighter, healthier future.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button size="lg" variant="solid" sx={{ bgcolor: 'primary.50', color: 'primary.700', '&:hover': { bgcolor: 'primary.100' } }}>
                    Learn More
                  </Button>
                  <Button size="lg" variant="outlined" sx={{ color: 'common.white', borderColor: 'common.white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    Schedule Consultation
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

         {/* Services Section */}
         <Box sx={{ py: 0, bgcolor: 'background.surface' }}>
          {/* <Container maxWidth="lg">
            <Typography level="h2" component="h3" sx={{ textAlign: 'center', mb: 4, fontFamily: 'display', color: 'primary.700' }}>
              Our Services
            </Typography>
            <Typography sx={{ textAlign: 'center', mb: 6, maxWidth: '800px', mx: 'auto' }}>
              Discover our range of innovative stem cell therapies and personalized treatments designed to revolutionize your health and well-being.
            </Typography>
            <CarouselServices services={services} />
          </Container> */}
          <CarouselServices services={services} />
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ py: 12, bgcolor: 'background.body' }}>
          <Container maxWidth="lg">
            <Typography level="h2" component="h3" sx={{ textAlign: 'center', mb: 6, fontFamily: 'display', color: 'primary.700' }}>
              Why Choose Marc Medics?
            </Typography>
            <Grid container spacing={4}>
              <Grid xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <MicroscopeIcon size={48} color={theme.colorSchemes.light.palette.primary[500]} />
                    <Typography level="h4" component="h4" sx={{ my: 2, fontFamily: 'display' }}>
                      Cutting-edge Technology
                    </Typography>
                    <Typography>
                      We utilize the latest advancements in stem cell research and technology to provide you with the most effective treatments.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <UserIcon size={48} color={theme.colorSchemes.light.palette.primary[500]} />
                    <Typography level="h4" component="h4" sx={{ my: 2, fontFamily: 'display' }}>
                      Expert Team
                    </Typography>
                    <Typography>
                      Our team of experienced doctors and researchers are leaders in the field of regenerative medicine.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={4}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <HeartPulseIcon size={48} color={theme.colorSchemes.light.palette.primary[500]} />
                    <Typography level="h4" component="h4" sx={{ my: 2, fontFamily: 'display' }}>
                      Personalized Care
                    </Typography>
                    <Typography>
                      We develop tailored treatment plans to address your specific health needs and goals.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            bgcolor: 'primary.700',
            color: 'primary.contrastText',
            py: 12,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography level="h3" component="h4" sx={{ mb: 2, fontFamily: 'display' }}>
              Ready to Transform Your Health?
            </Typography>
            <Typography sx={{ mb: 4, fontSize: 'lg' }}>
              Contact us today to schedule a consultation and learn how stem cell therapy can benefit you.
            </Typography>
            <Button size="lg" variant="solid" sx={{ bgcolor: 'primary.50', color: 'primary.700', '&:hover': { bgcolor: 'primary.100' } }}>
              Schedule Consultation
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Sheet
          component="footer"
          sx={{
            py: 6,
            px: 2,
            bgcolor: 'background.surface',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid xs={12} md={4}>
                <Typography level="h6" component="h5" sx={{ mb: 2, fontFamily: 'display', color: 'primary.500' }}>
                  Marc Medics
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Pioneering stem cell therapies for a healthier future.
                </Typography>
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="h6" component="h5" sx={{ mb: 2, fontFamily: 'display' }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="plain" color="neutral" sx={{ justifyContent: 'flex-start' }}>About Us</Button>
                  <Button variant="plain" color="neutral" sx={{ justifyContent: 'flex-start' }}>Our Services</Button>
                  <Button variant="plain" color="neutral" sx={{ justifyContent: 'flex-start' }}>Contact</Button>
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="h6" component="h5" sx={{ mb: 2, fontFamily: 'display' }}>
                  Contact Us
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon size={16} />
                    <Typography>+1 (555) 123-4567</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MailIcon size={16} />
                    <Typography>info@marcmedics.com</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Typography level="body2" sx={{ textAlign: 'center' }}>
              © 2023 Marc Medics. All rights reserved.
            </Typography>
          </Container>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

