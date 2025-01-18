import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Button, Typography, Grid, Container, Card, CardContent } from '@mui/joy';
import {  MicroscopeIcon, HeartPulseIcon, BrainIcon, UserIcon,
          BabyIcon, BuildingIcon, StarIcon, ActivityIcon
 } from 'lucide-react';
//  import { isMobile } from "react-device-detect";

import Header from '../components/topNavBar copy';
import Footer from '../components/footer';
import CarouselServices from '../components/rotatingServicecards-transparent-cards';

// here the images are imported
import dna from '../images/dna-24.jpg';
import dna_mirror from '../images/dna_mirror-Photoroom.png';
import stem_cells from '../images/stem_cells.png';
import regenerative_therapy from '../images/regenerative_therapy.png';
import personalized_care from '../images/personalized_care.png';
import orthopedics from '../images/orthopedics.png';
import plastic_surgery from '../images/plastic_surgery.jpg';
import { isMobile } from 'react-device-detect';

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
    description: 'Stem Cell Therapy uses the regenerative power of stem cells to treat various conditions. From chronic illnesses to injuries, it repairs tissues, reduces inflammation, and promotes cellular healing, showing promise for diabetes, heart disease, and more.', 
    icon: <MicroscopeIcon />,
    image: stem_cells
  },
  { 
    title: 'Regenerative Medicine', 
    description: 'Regenerative Medicine restores damaged tissues and organs using breakthroughs like tissue engineering and stem cells. It offers personalized, minimally invasive solutions for injuries, arthritis, and age-related conditions.', 
    icon: <HeartPulseIcon />,
    image: regenerative_therapy
  },
  { 
    title: 'Personalized Care', 
    description: 'Personalized Care tailors treatments to your medical history, genetics, and lifestyle. Focusing on your needs, it optimizes diagnostics and therapies for safety and effectiveness, ensuring the care you deserve.', 
    icon: <UserIcon />,
    image: personalized_care
  },
  { 
    title: 'Stem Cell Plastic Surgery', 
    description: 'Stem cell plastic surgery targets neural regeneration to address disorders like Parkinson’s, multiple sclerosis, and stroke recovery. It promotes better motor functions, reduced symptoms, and improved quality of life.', 
    icon: <BrainIcon />,
    image: plastic_surgery
  },
  { 
    title: 'Orthopedics', 
    description: 'Stem cell therapies offer minimally invasive treatments for sports injuries, chronic pain, and joint issues. They support natural healing, improve mobility, and provide an alternative to surgery for active individuals.', 
    icon: <HeartPulseIcon />,
    image: orthopedics
  },
];


export default function HomePage() {
    const navigate = useNavigate();
    return (
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
            paddingRight: '2px',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            backgroundImage: !isMobile ? `url(${dna})` : `url(${dna_mirror})`,
            backgroundSize: 'cover', // Zoom in the background image on mobile
            backgroundPosition: isMobile ? 'calc(100% + 50px) 10%' : 'center 90%',
            // filter: isMobile ? 'blur(4px)' : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            WebkitBackgroundSize: 'cover', // For Safari support
            mozBackgroundSize: 'cover',    // For Firefox support
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
                        onClick={() => {
                          navigate('/about')
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
                        onClick={() => {
                          navigate('/contact')
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
            <Box sx={{ py: 8, bgcolor: 'rgba(255, 255, 255, 0)' }}>
              <Container maxWidth="lg">
                  <Typography level="h2" component="h3" sx={{ textAlign: 'center', mb: 4, fontFamily: 'display', color: 'white' }}>
                    Why Choose Marc Medics?
                  </Typography>
                  {/* <Typography sx={{ textAlign: 'center', mb: 6, maxWidth: '800px', mx: 'auto', color: 'white' }}>
                    At Marc Medics, we combine cutting-edge technology with personalized care to deliver exceptional results in stem cell therapy and regenerative medicine.
                  </Typography> */}
                  <Grid 
                    container 
                    spacing={3} 
                    sx={{
                      '& > .MuiGrid-item': {
                        transition: 'all 0.3s ease-in-out',
                      },
                      '&:hover > .MuiGrid-item:not(:hover)': {
                        filter: 'blur(2px)',
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    {[
                      { title: "Cutting-edge Technology", description: "We utilize the latest advancements in stem cell research and technology to provide you with the most effective and innovative treatments available.", icon: <MicroscopeIcon size={40} /> },
                      { title: "Personalized Care", description: "We develop tailored treatment plans to address your specific health needs and goals, ensuring the best possible outcomes for your unique situation.", icon: <HeartPulseIcon size={40} /> },
                      { title: "Sports Medicine", description: "Experience pro-level stem cell treatments for sports injuries, now accessible to passionate athletes of all levels. Optimize your performance and recovery with our cutting-edge therapies.", icon: <ActivityIcon size={40} /> },
                      { title: "Multidisciplinary Poly Clinic", description: "Our comprehensive health optimization center offers a wide range of specialties, from dermatology to endocrinology, all under one roof for your convenience and holistic care.", icon: <BuildingIcon size={40} /> },
                      { title: "'Doc Stars' Network", description: "Partner with the city's leading practitioners and surgeons, carefully selected for their expertise and ethical standards, ensuring you receive the best possible care.", icon: <StarIcon size={40} /> },
                      { title: "Stem Cell Banking", description: "Secure your child’s health with umbilical cord stem cell banking. This simple birth procedure offers a vital resource for treating illnesses and ensures viable cells for future use.", icon: <BabyIcon size={40} /> },
                    ].map((item, index) => (
                      <Grid key={index} xs={12} md={4}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            height: '250px',
                            transition: 'all 0.3s ease-in-out',
                            position: 'relative',
                            overflow: 'hidden',
                            bgcolor: 'rgba(255, 255, 255, 1)',
                            backdropFilter: 'blur(20px)',
                            // background: 'linear-gradient(to bottom, #ffffff, #f0f7ff)',
                            '&:hover': {
                              transform: 'translateY(-10px)',
                              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                              zIndex: 1,
                              '& .description': {
                                opacity: 1,
                                transform: 'translateY(0)',
                              },
                              '& .preview': {
                                opacity: 0,
                              },
                              '& .content-wrapper': {
                                transform: 'translateY(-20px)',
                              }
                            },
                          }}
                        >
                          <CardContent
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              p: 3,
                              position: 'relative',
                            }}
                          >
                            <Box 
                              className="content-wrapper"
                              sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.3s ease-in-out',
                              }}
                            >
                              <Box 
                                sx={{ 
                                  color: 'primary.500', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  mb: 2,
                                }}
                              >
                                {item.icon}
                              </Box>
                              
                              <Typography
                                level="h5" 
                                component="h4"
                                sx={{
                                  fontFamily: 'display',
                                  textAlign: 'center',
                                  mb: 2,
                                  color: 'black'
                                }}
                              >
                                {item.title}
                              </Typography>

                              <Typography
                                className="preview"
                                sx={{
                                  fontSize: '0.875rem',
                                  textAlign: 'center',
                                  opacity: 1,
                                  transition: 'opacity 0.3s ease-in-out',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  color: 'black'
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Box>

                            <Typography
                              className="description"
                              sx={{
                                position: 'absolute',
                                bottom: 24,
                                left: 24,
                                right: 24,
                                opacity: 0,
                                transform: 'translateY(20px)',
                                transition: 'all 0.3s ease-in-out',
                                textAlign: 'center',
                                lineHeight: 1.6,
                                fontSize: '0.875rem',
                                color: 'black'
                              }}
                            >
                              {item.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
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
                  onClick={() => {
                    navigate('/contact')
                  }}
                >
                  Schedule Consultation
                </Button>
              </Container>
            </Box>
  
            {/* Footer */}
            <Footer />
          </Box>
        </Box>
      </CssVarsProvider>
    );
}
  