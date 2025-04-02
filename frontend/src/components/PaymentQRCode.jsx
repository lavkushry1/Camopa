import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress, 
  TextField,
  Grid,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const PaymentQRCode = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('tracking');
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (trackingId) {
      fetchApplicationDetails();
    } else {
      setError('Tracking ID is missing. Please go back to the application tracker.');
      setLoading(false);
    }
  }, [trackingId]);

  const fetchApplicationDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/applications/track/${trackingId}`);
      setApplication(response.data);
      
      if (response.data.status !== 'PAYMENT_PENDING') {
        if (response.data.status === 'PAYMENT_VERIFIED' || response.data.status === 'APPROVED') {
          setPaymentSuccess(true);
        } else {
          setError('This application is not ready for payment yet. Current status: ' + response.data.status);
        }
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch application details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPayment = async () => {
    if (!transactionId.trim() || !utrNumber.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setConfirmDialogOpen(true);
  };

  const confirmPayment = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/payments/verify`, {
        trackingId,
        transactionId,
        utrNumber
      });
      setPaymentSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to record payment. Please try again or contact support.');
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !application) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Box>
      </Box>
    );
  }

  if (paymentSuccess) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Payment verification submitted successfully!
          </Alert>
          <Typography variant="h5" gutterBottom>
            Payment Received
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for your payment. Our team will verify your payment details and update your application status.
          </Typography>
          <Typography variant="body1" paragraph>
            You will be notified once your payment is verified and your dealership is approved.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.href = `/track?tracking=${trackingId}`}
            sx={{ mt: 2 }}
          >
            Track Application
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Payment for Dealership Application
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Application Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Tracking ID:</strong> {application.trackingId}
              </Typography>
              <Typography variant="body2">
                <strong>Applicant:</strong> {application.firstName} {application.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Business Name:</strong> {application.businessName}
              </Typography>
              <Typography variant="body2">
                <strong>Amount Due:</strong> ₹{application.paymentAmount || '50,000'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Scan & Pay
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Box 
                component="img" 
                src="/qr-code.png" 
                alt="Payment QR Code"
                sx={{ 
                  width: 200, 
                  height: 200, 
                  mb: 2,
                  border: '1px solid #ddd',
                  p: 1
                }}
              />
              <Typography variant="subtitle2" gutterBottom>
                UPI ID: payments@campabeverages
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Confirm Your Payment
            </Typography>
            <Typography variant="body2" paragraph>
              After making the payment, please enter the transaction details below:
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Transaction ID"
                  variant="outlined"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="UTR Number"
                  variant="outlined"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  required
                  margin="normal"
                  helperText="Reference number from your payment app"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={handleSubmitPayment}
                disabled={loading}
              >
                Submit Payment Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Payment Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Please ensure that you have made the payment of ₹{application.paymentAmount || '50,000'} to Camopa Beverages via UPI.
          </Typography>
          <Typography variant="body1">
            Once you confirm, our team will verify your payment and process your application.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmPayment} variant="contained" color="primary" autoFocus>
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentQRCode;
