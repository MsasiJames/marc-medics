/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton, useTheme  } from '@mui/joy';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isMobile } from "react-device-detect";

const CarouselServices = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 10000); // Auto advance every 3 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? services.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      (current + 1) % services.length
    );
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: '600px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px'
      }}
    >
      {/* Main Cards and Paired Cards Side by Side */}
      <Box 
        sx={{ 
          position: 'relative',
          height: isMobile ? '90%' : '70%',
          width: '90%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {/* Main Cards */}
        <Box 
          sx={{ 
            position: 'relative',
            height: '100%',
            width: isMobile ? '100%' : '48%',
            display: isMobile ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {services.map((service, index) => {
            const distance = index - activeIndex;
            const absoluteDistance = Math.abs(distance);
            const isActive = distance === 0;
            
            return (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                  opacity: absoluteDistance > 2 ? 0 : 1,
                  bgcolor: 'rgba(255, 255, 255, 0)',
                  backdropFilter: 'blur(20px)',
                  // background: `linear-gradient(to bottom, ${theme.vars.palette.background.body}, ${theme.vars.palette.primary[50]})`,
                  transform: `
                    translateX(${distance * 60}px)
                    translateZ(${isActive ? 0 : -150 * absoluteDistance}px)
                    scale(${1 - absoluteDistance * 0.15})
                    rotateY(${distance * 10}deg)
                  `,
                  transition: 'all 0.5s ease-in-out',
                  zIndex: isActive ? 3 : 2 - absoluteDistance,
                  pointerEvents: isActive ? 'auto' : 'none',
                  boxShadow: isActive ? 'lg' : 'md',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  p: 4
                }}>
                  <Box sx={{ mb: 2, color: 'primary.500', alignSelf: 'center' }}>
                    {React.cloneElement(service.icon, { size: 48 })}
                  </Box>
                  <Typography 
                    level="h4" 
                    component="h4" 
                    sx={{ 
                      mb: 2,
                      opacity: 1 - absoluteDistance * 0.3,
                      fontFamily: 'display',
                      textAlign: 'center',
                      color: 'white'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    sx={{ 
                      opacity: 1 - absoluteDistance * 0.3,
                      flex: 1,
                      overflow: 'auto',
                      textAlign: 'center',
                      color: 'white'
                    }}
                  >
                    {service.description}
                  </Typography>
                  {/* <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <IconButton 
                      variant="outlined" 
                      color="primary"
                      sx={{ 
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    >
                      Learn More
                    </IconButton>
                  </Box> */}
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Paired Cards */}
        {!isMobile && ( // Hide Paired Cards on Mobile
          <Box 
            sx={{ 
              position: 'relative',
              height: '100%',
              width: '48%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {services.map((_, index) => {
              const distance = index - activeIndex;
              const absoluteDistance = Math.abs(distance);
              const isActive = distance === 0;

              return (
                <Card
                  key={`paired-${index}`}
                  variant="outlined"
                  sx={{
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    opacity: absoluteDistance > 2 ? 0 : 1,
                    transform: `
                      translateX(${distance * 60}px)
                      translateZ(${isActive ? 0 : -150 * absoluteDistance}px)
                      scale(${1 - absoluteDistance * 0.15})
                      rotateY(${distance * 10}deg)
                    `,
                    transition: 'all 0.5s ease-in-out',
                    zIndex: isActive ? 3 : 2 - absoluteDistance,
                    pointerEvents: isActive ? 'auto' : 'none',
                    boxShadow: isActive ? 'lg' : 'md',
                    backgroundImage: `url(${_.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Typography
                      level="h5"
                      component="h5"
                      sx={{
                        opacity: 1 - absoluteDistance * 0.3,
                      }}
                    >
                      Image
                    </Typography> */}
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: '5%',
          zIndex: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': { bgcolor: 'background.level1' },
          boxShadow: 'md',
        }}
      >
        <ChevronLeft />
      </IconButton>
      
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: '5%',
          zIndex: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': { bgcolor: 'background.level1' },
          boxShadow: 'md',
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );

};

export default CarouselServices;
