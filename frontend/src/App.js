import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Components
import DealershipForm from './components/DealershipForm';
import ApplicationTracker from './components/ApplicationTracker';
import PaymentQRCode from './components/PaymentQRCode';
import HomePage from './components/HomePage';

// Create a theme matching Campa Beverages branding
const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935', // Red from Campa Beverages
    },
    secondary: {
      main: '#1e88e5', // Blue from Campa Beverages products
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<DealershipForm />} />
          <Route path="/track" element={<ApplicationTracker />} />
          <Route path="/payment" element={<PaymentQRCode />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
