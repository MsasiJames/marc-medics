import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Button, Typography, Sheet, Grid, Divider, Container, Card, CardContent } from '@mui/joy';
import { MicroscopeIcon, HeartPulseIcon, BrainIcon, UserIcon } from 'lucide-react';

import Header from '../components/topNavBar copy';
import CarouselServices from '../components/rotatingServicecards';

// here the images are imported
import dna from '../images/dna.png';
import stem_cells from '../images/stem_cells.png';
import regenerative_therapy from '../images/regenerative_therapy.png';
import personalized_care from '../images/personalized_care.png';
import orthopedics from '../images/orthopedics.png';
import plastic_surgery from '../images/plastic_surgery.jpg';

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
  { 
    title: 'Stem Cell Therapy', 
    description: 'Stem Cell Therapy is a cutting-edge medical approach designed to harness the natural regenerative abilities of stem cells to treat a variety of conditions. From chronic illnesses to acute injuries, this therapy aims to repair damaged tissues, reduce inflammation, and promote healing at a cellular level. With ongoing advancements, it holds promise for treating conditions such as diabetes, heart disease, and degenerative disorders.', 
    icon: <MicroscopeIcon />,
    image: stem_cells
  },
  { 
    title: 'Regenerative Medicine', 
    description: 'Regenerative Medicine is an advanced field that focuses on restoring the structure and function of damaged tissues and organs. Using breakthrough techniques like tissue engineering, stem cell applications, and molecular biology, this approach helps the body heal itself. Whether addressing sports injuries, arthritis, or age-related conditions, regenerative medicine is paving the way for personalized and minimally invasive treatments.', 
    icon: <HeartPulseIcon />,
    image: regenerative_therapy
  },
  { 
    title: 'Personalized Care', 
    description: 'Personalized Care is at the heart of modern healthcare, offering treatment plans tailored to your unique medical history, genetic profile, and lifestyle. By focusing on your individual needs, this approach ensures that every decision—from diagnostics to therapy—is optimized for effectiveness and safety. Our commitment to personalized care ensures that you receive the attention and treatment you deserve.', 
    icon: <UserIcon />,
    image: personalized_care
  },
  { 
    title: 'Stem cell plastic surgery', 
    description: 'Neurological Treatments utilizing stem cell therapy are opening new frontiers in addressing disorders such as Parkinson’s disease, multiple sclerosis, and stroke recovery. By targeting damaged neurons and promoting neural regeneration, these innovative approaches aim to improve cognitive and motor functions, reduce symptoms, and enhance overall quality of life for individuals with neurological challenges.', 
    icon: <BrainIcon />,
    image: plastic_surgery
  },
  { 
    title: 'Orthopedics', 
    description: 'Stem cell-assisted treatments offer a minimally invasive solution for sports injuries, chronic pain, and joint issues. These therapies promote natural healing, reduce downtime, and improve mobility, making them a safe and effective alternative to surgery for active individuals and athletes.', 
    icon: <HeartPulseIcon />,
    image: orthopedics
  },
];

export default function HomePage() {
    return (
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            backgroundImage: `url(${dna})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'common.white',
          }}
        >
          {/* Overlay to adjust background visibility */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(13,147,227,0.8) 0%, rgba(1,18,27,0) 50%)',
            }}
          />
  
          {/* Main Content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <Header />
  
            {/* Hero Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  <Grid xs={12} md={8}>
                    <Typography
                      level="h1"
                      component="h2"
                      sx={{
                        mb: 2,
                        fontFamily: 'display',
                        fontWeight: 'bold',
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        color: 'white'
                      }}
                    >
                      Pioneering Stem Cell Therapies for a Healthier Tomorrow
                    </Typography>
                    <Typography sx={{ mb: 4, fontSize: { xs: 'md', md: 'lg' }, color: 'white' }}>
                      At Marc Medics, we're at the forefront of regenerative medicine, harnessing the power of stem cells to transform lives. Our cutting-edge therapies offer hope for those seeking innovative solutions to complex health challenges.
                    </Typography>
                    <Typography sx={{ mb: 4, fontSize: { xs: 'md', md: 'lg' }, color: 'white' }}>
                      Discover how our personalized treatments can help you unlock your body's natural healing potential and pave the way for a brighter, healthier future.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        size="lg"
                        variant="solid"
                        sx={{
                          bgcolor: 'primary.50',
                          color: 'primary.700',
                          '&:hover': { bgcolor: 'primary.100' },
                        }}
                      >
                        Learn More
                      </Button>
                      <Button
                        size="lg"
                        variant="outlined"
                        sx={{
                          color: 'common.white',
                          borderColor: 'common.white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                        }}
                      >
                        Schedule Consultation
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
  
            {/* Services Section */}
            <Box sx={{ py: 3, bgcolor: 'rgba(255, 255, 255, 0)', color: 'text.primary' }}>
              <CarouselServices services={services} />
            </Box>
  
            {/* Why Choose Us Section */}
            <Box sx={{ py: 12, bgcolor: 'rgba(255, 255, 255, 0)', color: 'text.primary' }}>
                <Container maxWidth="lg">
                    <Typography level="h2" component="h3" sx={{ textAlign: 'center', mb: 6, fontFamily: 'display', color: 'white' }}>
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
                bgcolor: 'rgba(255, 255, 255, 0)',
                color: 'primary.contrastText',
                py: 12,
                textAlign: 'center',
              }}
            >
              <Container maxWidth="md">
                <Typography level="h3" component="h4" sx={{ mb: 2, fontFamily: 'display', color: 'white' }}>
                  Ready to Transform Your Health?
                </Typography>
                <Typography sx={{ mb: 4, fontSize: 'lg', color: 'white' }}>
                  Contact us today to schedule a consultation and learn how stem cell therapy can benefit you.
                </Typography>
                <Button
                  size="lg"
                  variant="solid"
                  sx={{ bgcolor: 'primary.50', color: 'primary.700', '&:hover': { bgcolor: 'primary.100' } }}
                >
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
                bgcolor: 'rgba(255, 255, 255, 0)',
                color: 'text.primary',
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  {/* Footer content */}
                </Grid>
                <Divider sx={{ my: 4 }} />
                <Typography level="body2" sx={{ textAlign: 'center' }}>
                  © 2023 Marc Medics. All rights reserved.
                </Typography>
              </Container>
            </Sheet>
          </Box>
        </Box>
      </CssVarsProvider>
    );
}
  