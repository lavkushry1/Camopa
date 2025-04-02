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
  useTheme,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ApplicationTracker from './ApplicationTracker';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [videoError, setVideoError] = useState(false);
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

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <Box sx={{ bgcolor: '#000', color: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Background Video/Image */}
        {!videoError ? (
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
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
        ) : (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/assets/campa-bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
              zIndex: 0,
            }}
          />
        )}

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }}
        />

        {/* Top Navigation Bar */}
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 2, 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/assets/campa-logo-white.png"
              alt="Campa Beverages"
              sx={{
                height: isMobile ? '40px' : '50px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                document.getElementById('text-logo').style.display = 'block';
              }}
            />
            <Typography 
              id="text-logo"
              variant="h5"
              component="div"
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                display: 'none',
                ml: 1
              }}
            >
              CAMPA
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button 
              variant="text" 
              color="inherit"
              sx={{ mx: 1, fontWeight: 500 }}
              onClick={handleOpen}
            >
              Apply For Dealership
            </Button>
          </Box>
        </Box>

        {/* Hero Content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative', 
            zIndex: 2, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            py: 4
          }}
        >
          <Typography 
            variant={isMobile ? "h3" : "h1"} 
            component="h1" 
            fontWeight="800" 
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
            Join Campa Beverages as an authorized dealer
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
              backgroundColor: '#652C90',
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#4A1E8A',
                boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
              }
            }}
          >
            Apply for Dealership / Check Status
          </Button>
        </Container>
      </Box>

      {/* Product Showcase Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold"
          sx={{ mb: 6, color: 'white', textTransform: 'uppercase' }}
        >
          Dealership Benefits
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                height: '100%',
                background: 'linear-gradient(to bottom right, rgba(101, 44, 144, 0.2), rgba(101, 44, 144, 0.1))',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                fontWeight="bold" 
                sx={{ mb: 2, color: '#E3268E' }}
              >
                Iconic Brand
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Partner with one of India's most beloved beverage brands with a rich legacy and strong market presence.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                height: '100%',
                background: 'linear-gradient(to bottom right, rgba(101, 44, 144, 0.2), rgba(101, 44, 144, 0.1))',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                fontWeight="bold" 
                sx={{ mb: 2, color: '#E3268E' }}
              >
                Robust Support
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Get comprehensive business support including marketing materials, supply chain assistance, and training.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                height: '100%',
                background: 'linear-gradient(to bottom right, rgba(101, 44, 144, 0.2), rgba(101, 44, 144, 0.1))',
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                fontWeight="bold" 
                sx={{ mb: 2, color: '#E3268E' }}
              >
                Growing Market
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Take advantage of India's rapidly expanding beverage market with products that appeal to all demographics.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 10, 
          background: 'linear-gradient(to right, #652C90, #E3268E)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" color="white" sx={{ mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="white" sx={{ mb: 4, opacity: 0.9 }}>
            Join the Campa Beverages family today and become part of India's beverage revolution
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleOpen}
            sx={{ 
              py: 1.5, 
              px: 5, 
              fontSize: '1.1rem',
              borderRadius: '50px',
              bgcolor: 'white',
              color: '#652C90',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#111', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            &copy; {new Date().getFullYear()} Camopa Beverages Dealership Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>

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
            Camopa Beverages Dealership
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
                  Start Your Camopa Beverages Dealership Application
                </Typography>
                <Typography variant="body1" paragraph>
                  Join the Camopa Beverages family and be part of India's iconic beverage brand. 
                  Fill out our application form to begin your journey.
                </Typography>
                <Button 
                  component={Link} 
                  to="/apply" 
                  variant="contained" 
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#652C90',
                    '&:hover': {
                      backgroundColor: '#4A1E8A',
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
