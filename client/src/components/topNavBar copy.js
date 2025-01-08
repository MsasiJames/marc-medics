/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import logo from '../images/MARC WHITE LOGO.png';
import { isMobile } from 'react-device-detect';

const Header = () => {
  const navigate = useNavigate();
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
    { title: 'About', path: '/about' },
    // { title: 'Services', path: '/services' },
    { title: 'News', path: '/news' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <Sheet
      sx={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backdropFilter: 'blur(20px)', // Apply a blur effect to match the rest of the page
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // Adjust background color based on scroll
        transition: 'background-color 0.3s ease-in-out',
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
        }}
      >
        {isMobile? "Marc Medical" : <img 
          src={logo}
          style={{
            maxWidth: "12%",
            maxHeight: "12%",
            objectFit: "contain",
            }}
          alt="Logo"
          onClick={() => {
            navigate('/')
          }}
        >         
        </img>}
      </Typography>

      {/* Desktop Buttons */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          gap: 2,
        }}
      >
        {pages.map((page, index) => (
          <Button
            key={index}
            variant="plain"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}
            onClick={() => {
              navigate(page.path)
            }}
          >
            <Typography sx={{ color: 'white' }}>{page.title}</Typography>
          </Button>
        ))}
      </Box>

      {/* Mobile Menu Button */}
      <IconButton
        sx={{
          display: { xs: 'inline-flex', sm: 'none' },
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
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
