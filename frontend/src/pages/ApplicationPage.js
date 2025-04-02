import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Stepper, 
  Step, 
  StepLabel,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { applicationApi } from '../utils/api';

// Validation schema
const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  businessName: yup.string().required('Business name is required'),
  businessType: yup.string().required('Business type is required'),
  registrationNumber: yup.string().required('Registration number is required'),
  streetAddress: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal code is required'),
  areaOfOperation: yup.string().required('Area of operation is required'),
  expectedMonthlySales: yup.number().required('Expected monthly sales is required').positive('Must be a positive number'),
  previousExperience: yup.string().required('Previous experience is required'),
  references: yup.string().required('References are required'),
});

const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Partnership (LLP)',
  'Private Limited Company',
  'Public Limited Company',
  'Other'
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const ApplicationPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const steps = ['Personal Information', 'Business Details', 'Address Information', 'Additional Information'];

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      registrationNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      areaOfOperation: '',
      expectedMonthlySales: '',
      previousExperience: '',
      references: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        // Convert form values to API format
        const applicationData = {
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          business_name: values.businessName,
          business_type: values.businessType,
          registration_number: values.registrationNumber,
          street_address: values.streetAddress,
          city: values.city,
          state: values.state,
          postal_code: values.postalCode,
          area_of_operation: values.areaOfOperation,
          expected_monthly_sales: parseFloat(values.expectedMonthlySales),
          previous_experience: values.previousExperience,
          references: values.references
        };
        
        // Submit application to API
        const response = await applicationApi.submitApplication(applicationData);
        
        // Set tracking ID from response
        setTrackingId(response.tracking_id);
        setSubmissionSuccess(true);
        setActiveStep(steps.length); // Move to completion step
      } catch (err) {
        console.error('Error submitting application:', err);
        setError(err.response?.data?.detail || 'Failed to submit application. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNext = () => {
    let canProceed = true;
    
    // Validate fields for current step
    if (activeStep === 0) {
      const fields = ['fullName', 'email', 'phone'];
      fields.forEach(field => {
        try {
          yup.reach(validationSchema, field).validateSync(formik.values[field]);
        } catch (error) {
          formik.setFieldTouched(field, true, true);
          canProceed = false;
        }
      });
    } else if (activeStep === 1) {
      const fields = ['businessName', 'businessType', 'registrationNumber'];
      fields.forEach(field => {
        try {
          yup.reach(validationSchema, field).validateSync(formik.values[field]);
        } catch (error) {
          formik.setFieldTouched(field, true, true);
          canProceed = false;
        }
      });
    } else if (activeStep === 2) {
      const fields = ['streetAddress', 'city', 'state', 'postalCode'];
      fields.forEach(field => {
        try {
          yup.reach(validationSchema, field).validateSync(formik.values[field]);
        } catch (error) {
          formik.setFieldTouched(field, true, true);
          canProceed = false;
        }
      });
    }
    
    if (canProceed) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Business Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="businessName"
                  name="businessName"
                  label="Business Name"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                  helperText={formik.touched.businessName && formik.errors.businessName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="businessType"
                  name="businessType"
                  select
                  label="Business Type"
                  value={formik.values.businessType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.businessType && Boolean(formik.errors.businessType)}
                  helperText={formik.touched.businessType && formik.errors.businessType}
                >
                  {businessTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="registrationNumber"
                  name="registrationNumber"
                  label="Registration Number"
                  value={formik.values.registrationNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                  helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="streetAddress"
                  name="streetAddress"
                  label="Street Address"
                  value={formik.values.streetAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                  helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  select
                  label="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                >
                  {indianStates.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                  helperText={formik.touched.postalCode && formik.errors.postalCode}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="areaOfOperation"
                  name="areaOfOperation"
                  label="Area of Operation"
                  value={formik.values.areaOfOperation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.areaOfOperation && Boolean(formik.errors.areaOfOperation)}
                  helperText={formik.touched.areaOfOperation && formik.errors.areaOfOperation}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="expectedMonthlySales"
                  name="expectedMonthlySales"
                  label="Expected Monthly Sales (in INR)"
                  type="number"
                  value={formik.values.expectedMonthlySales}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.expectedMonthlySales && Boolean(formik.errors.expectedMonthlySales)}
                  helperText={formik.touched.expectedMonthlySales && formik.errors.expectedMonthlySales}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="previousExperience"
                  name="previousExperience"
                  label="Previous Experience in Beverage Distribution"
                  multiline
                  rows={4}
                  value={formik.values.previousExperience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.previousExperience && Boolean(formik.errors.previousExperience)}
                  helperText={formik.touched.previousExperience && formik.errors.previousExperience}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="references"
                  name="references"
                  label="References"
                  multiline
                  rows={4}
                  value={formik.values.references}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.references && Boolean(formik.errors.references)}
                  helperText={formik.touched.references && formik.errors.references}
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Dealership Application
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Thank you for your application!
            </Typography>
            <Typography variant="body1" paragraph>
              Your application has been submitted successfully. Your tracking ID is:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', my: 2, color: 'primary.main' }}>
              {trackingId}
            </Typography>
            <Typography variant="body1" paragraph>
              Please save this tracking ID to check your application status later.
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
          <form onSubmit={formik.handleSubmit}>
            {renderStepContent(activeStep)}
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => formik.handleSubmit()}
                  type="button"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        )}
      </Paper>
      
      <Snackbar open={submissionSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ApplicationPage;
