import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import QRCode from 'qrcode.react';
import { paymentApi } from '../utils/api';

const PaymentPage = ({ applicationId, amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId] = useState('campabeverages@upi');
  const [transactionId, setTransactionId] = useState('');
  
  const handlePaymentVerification = async () => {
    if (!transactionId) {
      setError('Please enter the transaction ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create payment record in the system
      const paymentData = {
        application_id: applicationId,
        amount: amount,
        transaction_id: transactionId,
        payment_method: 'UPI',
        status: 'pending'
      };
      
      await paymentApi.createPayment(paymentData);
      setPaymentSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      setError(err.response?.data?.detail || 'Failed to verify payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Dealership Payment
        </Typography>
        
        {paymentSuccess ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom color="success.main">
              Payment Verification Submitted!
            </Typography>
            <Typography variant="body1" paragraph>
              Your payment verification has been submitted successfully. Our team will verify the transaction and update your application status.
            </Typography>
            <Typography variant="body1" paragraph>
              Transaction ID: {transactionId}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/track"
              sx={{ mt: 2 }}
            >
              Track Your Application
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="body1" paragraph align="center">
              Please complete the payment using the UPI QR code below.
            </Typography>
            
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  p: 3, 
                  border: '1px solid #e0e0e0', 
                  borderRadius: 2,
                  display: 'inline-block',
                  bgcolor: 'white'
                }}>
                  <QRCode 
                    value={`upi://pay?pa=${upiId}&pn=Campa%20Beverages&am=${amount}&cu=INR&tn=DealershipFee`} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Scan with any UPI app
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Payment Details
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ₹{amount.toLocaleString('en-IN')}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    UPI ID
                  </Typography>
                  <Typography variant="body1">
                    {upiId}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    After payment, enter your transaction ID
                  </Typography>
                  <TextField
                    fullWidth
                    label="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  onClick={handlePaymentVerification}
                  sx={{ py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Verify Payment'}
                </Button>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Payment Instructions:
              </Typography>
              <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
                <li>Scan the QR code using any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                <li>Enter the amount ₹{amount.toLocaleString('en-IN')} if not auto-filled</li>
                <li>Complete the payment in your UPI app</li>
                <li>Enter the transaction ID/reference number from your UPI app</li>
                <li>Click "Verify Payment" to submit your payment details</li>
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentPage;
