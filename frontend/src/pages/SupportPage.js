import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { supportApi } from '../utils/api';

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message should be at least 10 characters').min(10, 'Message should be at least 10 characters')
});

const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError(null);
      
      try {
        // Convert form values to API format
        const requestData = {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message
        };
        
        // Submit support request to API
        await supportApi.submitSupportRequest(requestData);
        
        setSubmitted(true);
        resetForm();
      } catch (err) {
        console.error('Error submitting support request:', err);
        setError(err.response?.data?.detail || 'Failed to submit request. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  const faqs = [
    {
      question: 'What are the requirements to become a Campa Beverages dealer?',
      answer: 'To become a Campa Beverages dealer, you need to have a registered business, adequate storage facilities, distribution capabilities, and the ability to meet minimum order quantities. The specific requirements may vary based on your location and the scale of operation.'
    },
    {
      question: 'How long does the application process take?',
      answer: 'The typical application process takes 2-4 weeks. This includes the initial review of your application, verification of business details, and final approval. You will be able to track your application status using the tracking ID provided after submission.'
    },
    {
      question: 'What is the initial investment required?',
      answer: 'The initial investment varies based on your location and scale of operation. It typically includes a dealership fee, initial inventory purchase, and any necessary infrastructure setup. Detailed investment information will be provided after your application is approved.'
    },
    {
      question: 'What support does Campa Beverages provide to dealers?',
      answer: 'Campa Beverages provides comprehensive support including marketing materials, business guidance, product training, and regular supply chain assistance. We also offer promotional campaigns and branding support to help you grow your business.'
    },
    {
      question: 'Can I track my application status?',
      answer: 'Yes, you can track your application status using the tracking ID provided after submission. Simply visit the "Track Application" page and enter your tracking ID to see the current status and progress of your application.'
    },
    {
      question: 'How do I make the payment after approval?',
      answer: 'After your application is approved, you can make the payment through our secure UPI payment system. You will receive a QR code and payment instructions on the tracking page. We currently accept payments via all major UPI apps.'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
          Support & Contact
        </Typography>
        
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about becoming a Campa Beverages dealer? Fill out the form below and our team will get back to you.
              </Typography>
              
              <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.subject && Boolean(formik.errors.subject)}
                      helperText={formik.touched.subject && formik.errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="message"
                      name="message"
                      label="Message"
                      multiline
                      rows={4}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                      helperText={formik.touched.message && formik.errors.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                      sx={{ py: 1.5 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                You can also reach us directly using the following contact information:
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Dealership Inquiries
                </Typography>
                <Typography variant="body1" paragraph>
                  Email: dealership@campabeverages.com<br />
                  Phone: +91 1234567890<br />
                  Hours: Monday - Friday, 9:00 AM - 5:00 PM IST
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Head Office
                </Typography>
                <Typography variant="body1" paragraph>
                  Campa Beverages India Pvt. Ltd.<br />
                  123 Refreshment Road, Beverage District<br />
                  New Delhi - 110001<br />
                  India
                </Typography>
              </Box>
            </Paper>
            
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Track Your Application
              </Typography>
              <Typography variant="body1" paragraph>
                Already applied for a dealership? Track the status of your application.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                href="/track"
                sx={{ py: 1.5 }}
              >
                Track Application
              </Button>
            </Paper>
          </Grid>
        </Grid>
        
        {/* FAQs Section */}
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Frequently Asked Questions
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Box>
      
      <Snackbar open={submitted} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SupportPage;
