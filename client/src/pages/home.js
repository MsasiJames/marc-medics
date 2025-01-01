import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Button, Typography, Sheet, Grid, Card, CardContent, AspectRatio } from '@mui/joy'; 

// Extend the theme to include custom colors
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
      },
    },
  },
});

const services = [
  { title: 'Stem Cell Therapy', description: 'Cutting-edge treatments using stem cells for various conditions.' },
  { title: 'Regenerative Medicine', description: 'Advanced techniques to help your body heal itself.' },
  { title: 'Personalized Care', description: 'Tailored treatment plans for your specific needs.' },
];

export default function HomePage() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Sheet
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            px: 4,
            bgcolor: 'background.surface',
          }}
        >
          <Typography level="h4" component="h1">
            Marc Medics
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="plain" color="neutral">
              About
            </Button>
            <Button variant="plain" color="neutral">
              Services
            </Button>
            <Button variant="plain" color="neutral">
              Contact
            </Button>
          </Box>
        </Sheet>

        {/* Hero Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.100',
            color: 'primary.800',
            py: 8,
          }}
        >
          <Grid container spacing={4} sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
            <Grid xs={12} md={6}>
              <Typography level="h1" component="h2" sx={{ mb: 2 }}>
                Pioneering Stem Cell Therapies
              </Typography>
              <Typography sx={{ mb: 4 }}>
                Discover the future of medical treatments with our advanced stem cell therapies. We offer cutting-edge solutions for a range of conditions, helping you achieve optimal health and wellness.
              </Typography>
              <Button size="lg" color="primary" variant="solid">
                Learn More
              </Button>
            </Grid>
            <Grid xs={12} md={6}>
              <AspectRatio ratio="16/9" objectFit="cover" variant="outlined">
                <img
                  src="/placeholder.svg?height=360&width=640"
                  alt="Medical researchers working with stem cells"
                />
              </AspectRatio>
            </Grid>
          </Grid>
          
        </Box>

        {/* Services Section */}
        <Box sx={{ py: 8, bgcolor: 'background.surface' }}>
          <Typography level="h2" component="h3" sx={{ textAlign: 'center', mb: 4 }}>
            Our Services
          </Typography>
          <Grid container spacing={4} sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
            {services.map((service, index) => (
              <Grid key={index} xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="h4" component="h4" sx={{ mb: 2 }}>
                      {service.title}
                    </Typography>
                    <Typography>{service.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            bgcolor: 'primary.700',
            color: 'primary.contrastText',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Typography level="h3" component="h4" sx={{ mb: 2 }}>
            Ready to Transform Your Health?
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Contact us today to schedule a consultation and learn how stem cell therapy can benefit you.
          </Typography>
          <Button size="lg" color="primary" variant="solid" sx={{ bgcolor: 'primary.50', color: 'primary.700' }}>
            Schedule Consultation
          </Button>
        </Box>

        {/* Footer */}
        <Sheet
          sx={{
            py: 4,
            px: 2,
            bgcolor: 'background.surface',
            textAlign: 'center',
          }}
        >
          <Typography level="body2">
            © 2023 Marc Medics. All rights reserved.
          </Typography>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

