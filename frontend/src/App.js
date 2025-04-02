import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Components
import DealershipForm from './components/DealershipForm';
import ApplicationTracker from './components/ApplicationTracker';
import PaymentQRCode from './components/PaymentQRCode';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935', // Red color for Camopa brand
    },
    secondary: {
      main: '#ffc107', // Amber for accent
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<DealershipForm />} />
              <Route path="/track" element={<ApplicationTracker />} />
              <Route path="/payment" element={<PaymentQRCode />} />
              {/* Add more routes as needed */}
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

// Simple Home component
function Home() {
  return (
    <Box>
      <h1>Camopa Beverages Dealership Management System</h1>
      <p>Apply for a Camopa Beverages dealership, track your application, and more.</p>
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <a href="/apply" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#e53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Apply for Dealership
          </button>
        </a>
        <a href="/track" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Track Application
          </button>
        </a>
      </Box>
    </Box>
  );
}

export default App;
