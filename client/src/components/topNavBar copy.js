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
  ListItemDecorator,
  Divider,
} from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HelpIcon from '@mui/icons-material/Help';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CloseIcon from '@mui/icons-material/Close';
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
    { title: 'About', path: '/about', icon: <InfoIcon sx={{color: 'white'}} /> },
    { title: 'News', path: '/news', icon: <NewspaperIcon sx={{color: 'white'}}/> },
    { title: 'FAQ', path: '/faq', icon: <HelpIcon sx={{color: 'white'}}/> },
    { title: 'Contact', path: '/contact', icon: <ContactMailIcon sx={{color: 'white'}} /> },
  ];

  const sharedStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  };

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
        backdropFilter: 'blur(20px)',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
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
        {isMobile ? (
          <img 
            src={logo}
            style={{
              maxWidth: "50%",
              maxHeight: "50%",
              objectFit: 'contain',
            }}
            alt="Logo"
            onClick={() => navigate('/')}
          />
        ) : (
          <img 
            src={logo}
            style={{
              maxWidth: "12%",
              maxHeight: "12%",
              objectFit: "contain",
            }}
            alt="Logo"
            onClick={() => navigate('/')}
          />
        )}
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
            onClick={() => navigate(page.path)}
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
        slotProps={{
          content: {
            sx: {
              ...sharedStyles,
              width: '280px',
              height: '100%',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Typography level="h5" sx={{ color: 'white' }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        <List
          sx={{
            mt: 2,
            height: '100%',
          }}
        >
          {pages.map((page, index) => (
            <ListItem key={index}>
              <ListItemButton 
                onClick={() => {
                  navigate(page.path);
                  handleDrawerToggle();
                }}
                sx={{
                  color: '#fff',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(5px)',
                  },
                }}  
              >
                <ListItemDecorator sx={{ color: 'white' }}>
                  {page.icon}
                </ListItemDecorator>
                <ListItemContent>{page.title}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Sheet>
  );
};

export default Header;

