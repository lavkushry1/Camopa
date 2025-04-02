import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button,
  TextField,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationApi, paymentApi } from '../utils/api';
import PaymentPage from './PaymentPage';

const ApplicationDetailsPage = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  useEffect(() => {
    const fetchApplication = async () => {
      if (!trackingId) {
        navigate('/track');
        return;
      }
      
      try {
        const data = await applicationApi.getApplicationByTrackingId(trackingId);
        setApplication(data);
      } catch (err) {
        console.error('Error fetching application:', err);
        setError('Failed to load application details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplication();
  }, [trackingId, navigate]);
  
  const handlePaymentSuccess = async () => {
    setShowPaymentDialog(false);
    
    // Refresh application data to show updated payment status
    try {
      const data = await applicationApi.getApplicationByTrackingId(trackingId);
      setApplication(data);
    } catch (err) {
      console.error('Error refreshing application:', err);
    }
  };
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'submitted':
        return 'Submitted';
      case 'under_review':
        return 'Under Review';
      case 'additional_info_required':
        return 'Additional Information Required';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading application details...
        </Typography>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, my: 4, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/track')}
          >
            Back to Tracking Page
          </Button>
        </Paper>
      </Container>
    );
  }
  
  if (!application) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, my: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Application Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            We couldn't find an application with the provided tracking ID.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/track')}
          >
            Back to Tracking Page
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Application Details
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Tracking ID
              </Typography>
              <Typography variant="body1" gutterBottom>
                {application.tracking_id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography 
                variant="body1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: application.status === 'approved' ? 'success.main' : 
                         application.status === 'rejected' ? 'error.main' : 
                         'primary.main'
                }}
              >
                {getStatusLabel(application.status)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Submission Date
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formatDate(application.created_at)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formatDate(application.updated_at)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom>
          Applicant Information
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Full Name
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.full_name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.phone}
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="h5" gutterBottom>
          Business Information
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Business Name
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.business_name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Business Type
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.business_type}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Number
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.registration_number}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Area of Operation
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.area_of_operation}
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="h5" gutterBottom>
          Address Information
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Street Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.street_address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              City
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.city}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              State
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.state}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Postal Code
            </Typography>
            <Typography variant="body1" gutterBottom>
              {application.postal_code}
            </Typography>
          </Grid>
        </Grid>
        
        {application.status === 'approved' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {application.approval_letter ? (
              <Button
                variant="contained"
                color="secondary"
                href={application.approval_letter.file_path}
                target="_blank"
                sx={{ mr: 2 }}
              >
                Download Approval Letter
              </Button>
            ) : null}
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowPaymentDialog(true)}
            >
              Make Payment
            </Button>
          </Box>
        )}
        
        {application.status === 'additional_info_required' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Handle additional info submission
              }}
            >
              Provide Additional Information
            </Button>
          </Box>
        )}
      </Paper>
      
      <Dialog
        open={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div">
            Make Payment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <PaymentPage 
            applicationId={application?.id} 
            amount={25000} // Example amount, should come from the backend
            onSuccess={handlePaymentSuccess}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ApplicationDetailsPage;
