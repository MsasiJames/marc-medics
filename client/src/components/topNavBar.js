/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import dna from '../images/dna.png';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    { title: 'About', path: '/' },
    { title: 'Services', path: '/' },
    { title: 'Specialties', path: '/' },
    { title: 'FAQ', path: '/' },
    { title: 'Contact', path: '/' },
  ]

  return (
    <Sheet
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        overflow: 'hidden', // Ensure the pseudo-element stays within bounds
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dna})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: isScrolled ? 'blur(50px)' : 'blur(0px)', // Apply blur to background image
          transition: 'filter 0.3s ease-in-out',
          zIndex: -1, // Place behind content
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(255, 255, 255, 0.01)',
          zIndex: -1, // Place behind content but above background
        }
      }}
    >
      {/* Logo / Title */}
      <Typography
        level="h4"
        component="h1"
        sx={{
          fontFamily: 'display',
          fontWeight: 'bold',
          color: 'white',
          position: 'relative', // Ensure text stays above pseudo-elements
        }}
      >
        Marc Medics
      </Typography>

      {/* Desktop Buttons */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          gap: 2,
          position: 'relative', // Ensure buttons stay above pseudo-elements
        }}
      >
        {pages.map((page, index) => (
            <Button 
                key={index}
                variant="plain"
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent', // Prevents background change
                        boxShadow: 'none', // Ensures no shadow appears
                    },
                }}
            >
                <Typography sx={{color: 'white'}}>{page.title}</Typography>
            </Button>
        ))}
      </Box>

      {/* Mobile Menu Button */}
      <IconButton
        sx={{
          display: { xs: 'inline-flex', sm: 'none' },
          position: 'relative', // Ensure button stays above pseudo-elements
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer remains unchanged */}
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        sx={{ display: { sm: 'none' } }}
      >
        <Box sx={{ width: 250, py: 2, px: 1 }}>
          <List>
            {['About', 'Services', 'Specialties', 'FAQ', 'Contact'].map((text) => (
              <ListItem key={text}>
                <ListItemButton onClick={handleDrawerToggle}>
                  <ListItemContent>{text}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Sheet>
  );
};

export default Header;