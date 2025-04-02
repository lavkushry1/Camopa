import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 4,
          borderRadius: 2,
          mb: 6,
          backgroundImage: 'linear-gradient(135deg, #4a1e8a 0%, #7e4db9 100%)',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Become a Campa Beverages Dealer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Join the legacy of India's iconic beverage brand
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mb: 4 }}>
          Partner with Campa Beverages and be part of the Great Indian Taste revolution. 
          Our dealership program offers excellent business opportunities with one of India's 
          most iconic beverage brands, now reborn for modern India.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          component={RouterLink}
          to="/apply"
          sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
        >
          Apply Now
        </Button>
      </Box>

      {/* Benefits Section */}
      <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Why Partner With Us?
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom color="primary.main">
              Iconic Brand Legacy
            </Typography>
            <Typography variant="body1">
              Join a brand with over 50 years of legacy and strong recognition across India.
              Campa is one of the most iconic Indian beverage brands, now reborn for modern India.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom color="primary.main">
              Comprehensive Support
            </Typography>
            <Typography variant="body1">
              Receive marketing support, business guidance, and operational assistance
              to help you establish and grow your Campa Beverages dealership.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" component="h3" gutterBottom color="primary.main">
              Attractive Margins
            </Typography>
            <Typography variant="body1">
              Enjoy competitive pricing and attractive profit margins on our diverse
              range of beverages including Campa Cola, Orange, Lemon, and more.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Process Section */}
      <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Simple Application Process
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: 24,
              fontWeight: 'bold'
            }}>
              1
            </Box>
            <Typography variant="h6" gutterBottom>
              Submit Application
            </Typography>
            <Typography variant="body2">
              Fill out our online application form with your business details.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: 24,
              fontWeight: 'bold'
            }}>
              2
            </Box>
            <Typography variant="h6" gutterBottom>
              Application Review
            </Typography>
            <Typography variant="body2">
              Our team will review your application and contact you if needed.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: 24,
              fontWeight: 'bold'
            }}>
              3
            </Box>
            <Typography variant="h6" gutterBottom>
              Approval & Payment
            </Typography>
            <Typography variant="body2">
              Upon approval, make the required payment via our secure system.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mx: 'auto',
              mb: 2,
              fontSize: 24,
              fontWeight: 'bold'
            }}>
              4
            </Box>
            <Typography variant="h6" gutterBottom>
              Start Your Business
            </Typography>
            <Typography variant="body2">
              Download your approval letter and begin your journey with Campa.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Ready to join the Campa family?
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          component={RouterLink}
          to="/apply"
          sx={{ fontWeight: 'bold', px: 4, py: 1.5, mt: 2 }}
        >
          Apply for Dealership
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
