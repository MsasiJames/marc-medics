import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/joy';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselServices = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 5000); // Auto advance every 5 seconds

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
        height: '700px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px'
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
              width: '100%',
              height: '100%',
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
            }}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Box sx={{ mb: 2, color: 'primary.500' }}>
                {service.icon}
              </Box>
              <Typography 
                level="h4" 
                component="h4" 
                sx={{ 
                  mb: 2,
                  opacity: 1 - absoluteDistance * 0.3,
                  fontFamily: 'display',
                }}
              >
                {service.title}
              </Typography>
              <Typography
                sx={{ 
                  opacity: 1 - absoluteDistance * 0.3
                }}
              >
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: '10%',
          zIndex: 4,
          bgcolor: 'background.surface',
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
          right: '10%',
          zIndex: 4,
          bgcolor: 'background.surface',
          '&:hover': { bgcolor: 'background.level1' },
          boxShadow: 'md',
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );};

export default CarouselServices;

