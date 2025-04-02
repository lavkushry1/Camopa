import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Theme configuration based on Campa Beverages brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4a1e8a', // Deep purple from Campa website
      light: '#7e4db9',
      dark: '#2c0f5d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e63946', // Red from Campa Cola
      light: '#ff6b70',
      dark: '#b00020',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Campa Beverages Dealership Management System</div>} />
          {/* Routes will be added as components are developed */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
