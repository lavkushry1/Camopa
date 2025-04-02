import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            size="large"
          >
            Go to Homepage
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/support"
            size="large"
          >
            Contact Support
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
