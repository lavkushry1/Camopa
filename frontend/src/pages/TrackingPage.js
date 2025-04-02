import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { applicationApi } from '../utils/api';

// Validation schema
const validationSchema = yup.object({
  trackingId: yup.string().required('Tracking ID is required')
});

const TrackingPage = () => {
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      trackingId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch application data from API
        const response = await applicationApi.getApplicationByTrackingId(values.trackingId);
        setApplicationData(response);
      } catch (err) {
        console.error('Error fetching application:', err);
        setError(err.response?.data?.detail || 'No application found with this tracking ID');
      } finally {
        setLoading(false);
      }
    },
  });

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

  const getStatusStep = (status) => {
    switch(status) {
      case 'submitted':
        return 0;
      case 'under_review':
        return 1;
      case 'additional_info_required':
        return 1;
      case 'approved':
        return 2;
      case 'rejected':
        return 2;
      default:
        return 0;
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

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Track Your Application
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          Enter your tracking ID to check the status of your dealership application.
        </Typography>
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                id="trackingId"
                name="trackingId"
                label="Tracking ID"
                placeholder="e.g., CAMPA-ABC12345"
                value={formik.values.trackingId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.trackingId && Boolean(formik.errors.trackingId)}
                helperText={formik.touched.trackingId && formik.errors.trackingId}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Track Application'}
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}
        
        {applicationData && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Application Details
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tracking ID
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {applicationData.tracking_id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Applicant Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {applicationData.full_name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Business Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {applicationData.business_name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Submission Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatDate(applicationData.created_at)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Status
                </Typography>
                <Typography 
                  variant="body1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    color: applicationData.status === 'approved' ? 'success.main' : 
                           applicationData.status === 'rejected' ? 'error.main' : 
                           'primary.main'
                  }}
                >
                  {getStatusLabel(applicationData.status)}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Application Progress
            </Typography>
            
            <Stepper activeStep={getStatusStep(applicationData.status)} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Submitted</StepLabel>
              </Step>
              <Step>
                <StepLabel>Under Review</StepLabel>
              </Step>
              <Step>
                <StepLabel>Decision</StepLabel>
              </Step>
            </Stepper>
            
            {applicationData.status_updates && applicationData.status_updates.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  Status History
                </Typography>
                
                {applicationData.status_updates.map((item, index) => (
                  <Paper 
                    key={index} 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      mb: 2,
                      borderLeft: 4,
                      borderColor: item.new_status === 'approved' ? 'success.main' : 
                                  item.new_status === 'rejected' ? 'error.main' : 
                                  'primary.main'
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Date
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(item.created_at)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {getStatusLabel(item.new_status)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Notes
                        </Typography>
                        <Typography variant="body2">
                          {item.notes || 'No additional notes'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </>
            )}
            
            {applicationData.status === 'approved' && applicationData.approval_letter && (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  href={applicationData.approval_letter.file_path}
                  target="_blank"
                  sx={{ mr: 2 }}
                >
                  Download Approval Letter
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    // Handle payment logic
                  }}
                >
                  Make Payment
                </Button>
              </Box>
            )}
            
            {applicationData.status === 'additional_info_required' && (
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
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TrackingPage;
