import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  Grid,
  Alert
} from '@mui/material';
import axios from 'axios';

const applicationSteps = [
  'Application Submitted',
  'Under Review',
  'Payment Pending',
  'Payment Verified',
  'Approved'
];

const ApplicationTracker = () => {
  const [trackingId, setTrackingId] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackingIdChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/applications/track/${trackingId}`);
      setApplication(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Application not found. Please check your tracking ID.');
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  // Get current step index based on status
  const getStepIndex = (status) => {
    const statusMap = {
      'SUBMITTED': 0,
      'UNDER_REVIEW': 1,
      'PAYMENT_PENDING': 2,
      'PAYMENT_VERIFIED': 3,
      'APPROVED': 4,
      'REJECTED': -1
    };
    return statusMap[status] || 0;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Track Your Application
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Enter your application tracking ID to check the status of your dealership application.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Tracking ID"
            variant="outlined"
            value={trackingId}
            onChange={handleTrackingIdChange}
            placeholder="Enter your tracking ID"
            error={!!error}
            helperText={error}
          />
          <Button 
            variant="contained" 
            onClick={handleTrack}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Track'}
          </Button>
        </Box>
      </Paper>

      {application && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Application Details
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Applicant:</strong> {application.firstName} {application.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Business Name:</strong> {application.businessName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Application Date:</strong> {new Date(application.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Last Updated:</strong> {new Date(application.updatedAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Application Status
          </Typography>
          
          {application.status === 'REJECTED' ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Your application has been rejected. Reason: {application.rejectionReason || 'Not specified'}
            </Alert>
          ) : (
            <Box sx={{ mb: 3 }}>
              <Stepper activeStep={getStepIndex(application.status)} alternativeLabel>
                {applicationSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}
          
          {application.status === 'PAYMENT_PENDING' && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.href = `/payment?tracking=${application.trackingId}`}
              >
                Make Payment
              </Button>
            </Box>
          )}
          
          {application.status === 'APPROVED' && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.href = `/approval-letter?tracking=${application.trackingId}`}
              >
                Download Approval Letter
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ApplicationTracker;
