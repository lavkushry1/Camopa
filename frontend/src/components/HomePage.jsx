import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container,
  Typography, 
  Button, 
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

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#000',
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.7,
          zIndex: 0,
        }}
      >
        <source src="/assets/campa-video-bg.mp4" type="video/mp4" />
      </Box>

      {/* Overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-between',
          py: 3
        }}
      >
        {/* Header/Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img 
            src="/assets/campa-logo.png" 
            alt="Campa Beverages Logo" 
            style={{ 
              height: isMobile ? '50px' : '70px',
              maxWidth: '100%'
            }}
          />
        </Box>

        {/* Center Content */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant={isMobile ? "h3" : "h1"} 
            component="h1" 
            fontWeight="bold" 
            color="white"
            sx={{ 
              mb: 3, 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              textTransform: 'uppercase'
            }}
          >
            The Great Indian Taste
          </Typography>

          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h2" 
            color="white"
            sx={{ 
              mb: 6, 
              maxWidth: '800px', 
              mx: 'auto',
              textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
            }}
          >
            Join Campa Beverages as an official dealer
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleOpen}
            sx={{ 
              py: 2, 
              px: 6, 
              fontSize: isMobile ? '1rem' : '1.2rem',
              borderRadius: '50px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              backgroundColor: '#e53935',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#d32f2f',
                boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
              }
            }}
          >
            Apply for Dealership / Check Status
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
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
          backgroundColor: '#e53935', 
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
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#e53935',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    }
                  }}
                  size="large"
                  onClick={handleClose}
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
