import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when the user scrolls down 200 pixels
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: isVisible ? 'block' : 'none',
        transition: 'opacity 0.3s',
        '&:hover': {
          opacity: 0.8,
          background: 'linear-gradient(to right, #007bfa, #FF6347)', // Stylish gradient background
        },
      }}
    >
      <IconButton onClick={scrollToTop} color="primary" aria-label="Go to Top">
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
};

export default GoToTopButton;
