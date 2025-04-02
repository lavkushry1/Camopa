import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container,
  Typography, 
  Button, 
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ApplicationTracker from './ApplicationTracker';
import campaBgImage from '../assets/campa-bg.jpg';
import campaLogo from '../assets/campa-logo.png';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    // Add preload link for background image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = campaBgImage;
    link.as = 'image';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      background: `url(${campaBgImage}) no-repeat center center`,
      backgroundSize: 'cover',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img 
            src={campaLogo} 
            alt="Campa Beverages Logo" 
            style={{ 
              height: isMobile ? '60px' : '80px',
              maxWidth: '100%'
            }}
          />
        </Box>

        {/* Hero Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          textAlign: 'center',
          mt: isMobile ? 2 : 5
        }}>
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            component="h1" 
            fontWeight="bold" 
            color="white"
            sx={{ mb: 3, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Become a Campa Beverages Dealer
          </Typography>

          <Typography 
            variant="h5" 
            component="h2" 
            color="white"
            sx={{ 
              mb: 5, 
              maxWidth: '800px', 
              mx: 'auto',
              textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
            }}
          >
            Join the Campa Beverages family and be part of India's iconic beverage brand
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleOpen}
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.2rem',
              borderRadius: '30px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #652C90 30%, #E3268E 90%)',
              '&:hover': {
                boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
              }
            }}
          >
            Apply for Dealership / Check Status
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="white">
            &copy; {new Date().getFullYear()} Campa Beverages. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Dialog for Application/Tracking */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#652C90', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" component="div">
            Campa Beverages Dealership
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={handleClose} 
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Apply for Dealership" />
              <Tab label="Track Application" />
            </Tabs>
          </Box>
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Start Your Campa Beverages Dealership Application
                </Typography>
                <Typography variant="body1" paragraph>
                  Join the Campa Beverages family and be part of India's iconic beverage brand. 
                  Fill out our application form to begin your journey.
                </Typography>
                <Button 
                  component={Link} 
                  to="/apply" 
                  variant="contained" 
                  color="primary"
                  size="large"
                  onClick={handleClose}
                  sx={{ mt: 2 }}
                >
                  Start Application
                </Button>
              </Box>
            )}
            {tabValue === 1 && <ApplicationTracker isEmbedded={true} />}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomePage;
