import React from 'react';
import { Sheet, Typography, Container, Grid, Divider, List, ListItem, ListItemDecorator} from '@mui/joy';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Sheet
      component="footer"
      sx={{
        py: 6,
        bgcolor: 'rgba(0, 0, 0, 0.2)',
        color: 'white',
        backdropFilter: 'blur(40px)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography level="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.500' }}>
              Quick Links
            </Typography>
            <Link to="/" style={{ display: 'block', marginBottom: '8px', color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/faq" style={{ display: 'block', marginBottom: '8px', color: 'white', textDecoration: 'none' }}>
              FAQ
            </Link>
            <Link to="/news" style={{ display: 'block', marginBottom: '8px', color: 'white', textDecoration: 'none' }}>
              News
            </Link>
            <Link to="/about" style={{ display: 'block', marginBottom: '8px', color: 'white', textDecoration: 'none' }}>
              About Us
            </Link>
            <Link to="/contact" style={{ display: 'block', color: 'white', textDecoration: 'none' }}>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography level="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.500' }}>
              Follow Us
            </Typography>
            <Link to="https://www.facebook.com/stemcellmedics" style={{ display: 'block', marginBottom: '8px', color: 'white', textDecoration: 'none' }}>
                <FacebookIcon sx={{fontSize: '30px', color: 'white'}} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography level="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.500' }}>
              Contact Us
            </Typography>
            <List>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><MapPin color="white" /></ListItemDecorator>
                      Suite 2004, Centuria Medical Makati, Kalayaan Avenue, Makati City 1200, Philippines
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Phone color="white" /></ListItemDecorator>
                      +63 2 83535445
                    </ListItem>
                    <ListItem sx={{color: 'white'}}>
                      <ListItemDecorator><Mail color="white" /></ListItemDecorator>
                      info@marcmedics.com
                    </ListItem>
                  </List>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, bgcolor: 'white' }} /> {/* Optional: Change divider color */}
        <Typography level="body-sm" sx={{ textAlign: 'center', color: 'white' }}>
          © 2023 Marc Medics. All rights reserved.
        </Typography>
      </Container>
    </Sheet>
  );
};

export default Footer;