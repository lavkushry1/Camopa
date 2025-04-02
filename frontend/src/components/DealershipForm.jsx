import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  TextField, 
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const steps = ['Personal Information', 'Business Details', 'Location Information', 'Review & Submit'];

const DealershipForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [trackingId, setTrackingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  const initialValues = {
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Business Details
    businessName: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    yearsInBusiness: '',
    // Location Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    area: '',
    // Additional Information
    investmentCapacity: '',
    existingBusiness: '',
    reasonForInterest: ''
  };

  const validationSchemas = [
    // Step 1 validation
    Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required')
    }),
    // Step 2 validation
    Yup.object({
      businessName: Yup.string().required('Business name is required'),
      businessType: Yup.string().required('Business type is required'),
      gstNumber: Yup.string().matches(/^[0-9A-Z]{15}$/, 'Invalid GST Number'),
      panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Number').required('PAN Number is required'),
      yearsInBusiness: Yup.number().required('Years in business is required')
    }),
    // Step 3 validation
    Yup.object({
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
      area: Yup.string().required('Area is required')
    }),
    // Step 4 doesn't need validation as it's review
    Yup.object({})
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/applications`, values);
      setTrackingId(response.data.trackingId);
      setSnackbar({
        open: true,
        message: 'Application submitted successfully! Save your tracking ID for future reference.',
        severity: 'success'
      });
      setActiveStep(4); // move to success step
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || 'Error submitting application. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step, formikProps) => {
    const { values, errors, touched, handleChange, handleBlur } = formikProps;
    
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="businessName"
                name="businessName"
                label="Business Name"
                value={values.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.businessName && Boolean(errors.businessName)}
                helperText={touched.businessName && errors.businessName}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={touched.businessType && Boolean(errors.businessType)}>
                <InputLabel id="businessType-label">Business Type</InputLabel>
                <Select
                  labelId="businessType-label"
                  id="businessType"
                  name="businessType"
                  value={values.businessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Business Type"
                >
                  <MenuItem value="proprietorship">Proprietorship</MenuItem>
                  <MenuItem value="partnership">Partnership</MenuItem>
                  <MenuItem value="llp">Limited Liability Partnership</MenuItem>
                  <MenuItem value="pvtLtd">Private Limited Company</MenuItem>
                  <MenuItem value="publicLtd">Public Limited Company</MenuItem>
                </Select>
                {touched.businessType && errors.businessType && <FormHelperText>{errors.businessType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="yearsInBusiness"
                name="yearsInBusiness"
                label="Years In Business"
                value={values.yearsInBusiness}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.yearsInBusiness && Boolean(errors.yearsInBusiness)}
                helperText={touched.yearsInBusiness && errors.yearsInBusiness}
                variant="outlined"
                margin="normal"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="gstNumber"
                name="gstNumber"
                label="GST Number (Optional)"
                value={values.gstNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gstNumber && Boolean(errors.gstNumber)}
                helperText={touched.gstNumber && errors.gstNumber}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="panNumber"
                name="panNumber"
                label="PAN Number"
                value={values.panNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.panNumber && Boolean(errors.panNumber)}
                helperText={touched.panNumber && errors.panNumber}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={touched.state && Boolean(errors.state)}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="State"
                >
                  <MenuItem value="andhraPradesh">Andhra Pradesh</MenuItem>
                  <MenuItem value="arunachalPradesh">Arunachal Pradesh</MenuItem>
                  <MenuItem value="assam">Assam</MenuItem>
                  <MenuItem value="bihar">Bihar</MenuItem>
                  <MenuItem value="chhattisgarh">Chhattisgarh</MenuItem>
                  {/* Add all other states */}
                </Select>
                {touched.state && errors.state && <FormHelperText>{errors.state}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="pincode"
                name="pincode"
                label="Pincode"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pincode && Boolean(errors.pincode)}
                helperText={touched.pincode && errors.pincode}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="area"
                name="area"
                label="Area Coverage (in sq.ft)"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.area && Boolean(errors.area)}
                helperText={touched.area && errors.area}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Review Your Information</Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Personal Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Name:</strong> {values.firstName} {values.lastName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Email:</strong> {values.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Phone:</strong> {values.phone}</Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Business Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Business Name:</strong> {values.businessName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Business Type:</strong> {values.businessType}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>GST Number:</strong> {values.gstNumber || 'Not Provided'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>PAN Number:</strong> {values.panNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Years in Business:</strong> {values.yearsInBusiness}</Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Location Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Address:</strong> {values.address}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>City:</strong> {values.city}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>State:</strong> {values.state}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Pincode:</strong> {values.pincode}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Area Coverage:</strong> {values.area} sq.ft</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4, mb: 2 }}>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Application Submitted Successfully!
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Your tracking ID is: <strong>{trackingId}</strong>
            </Typography>
            <Typography>
              Please note down this tracking ID to check your application status.
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Next steps: Make payment via UPI QR code to complete your application.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 3 }}
              onClick={() => window.location.href = '/payment?tracking=' + trackingId}
            >
              Proceed to Payment
            </Button>
          </Box>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[activeStep]}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                {renderStepContent(activeStep, formikProps)}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        formikProps.validateForm().then(errors => {
                          if (Object.keys(errors).length === 0) {
                            handleNext();
                          } else {
                            formikProps.submitForm(); // This will trigger validation and show errors
                          }
                        });
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DealershipForm;
