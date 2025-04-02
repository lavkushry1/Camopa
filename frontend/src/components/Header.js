import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/campa-logo.png'; // This will be added later

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Logo placeholder - will be replaced with actual logo */}
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                CAMPA BEVERAGES
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: 'white' }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/apply"
              sx={{ color: 'white' }}
            >
              Apply for Dealership
            </Button>
            <Button
              component={RouterLink}
              to="/track"
              sx={{ color: 'white' }}
            >
              Track Application
            </Button>
            <Button
              component={RouterLink}
              to="/support"
              sx={{ color: 'white' }}
            >
              Support
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
