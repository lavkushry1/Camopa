import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { paymentApi } from '../../utils/api';

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  
  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // const response = await paymentApi.getAllPayments();
      // setPayments(response);
      
      // For now, we'll use mock data
      const mockPayments = [
        {
          id: 1,
          application_id: 3,
          application: {
            tracking_id: 'CAMPA-34567',
            full_name: 'Amit Patel',
            business_name: 'Patel Distribution'
          },
          amount: 25000,
          transaction_id: 'UPI123456789',
          payment_method: 'UPI',
          status: 'completed',
          created_at: '2025-03-18T16:35:00Z',
          updated_at: '2025-03-18T16:40:00Z'
        },
        {
          id: 2,
          application_id: 6,
          application: {
            tracking_id: 'CAMPA-67890',
            full_name: 'Neha Verma',
            business_name: 'Verma Enterprises'
          },
          amount: 25000,
          transaction_id: 'UPI987654321',
          payment_method: 'UPI',
          status: 'pending',
          created_at: '2025-03-21T10:15:00Z',
          updated_at: '2025-03-21T10:15:00Z'
        },
        {
          id: 3,
          application_id: 7,
          application: {
            tracking_id: 'CAMPA-78901',
            full_name: 'Rahul Mehta',
            business_name: 'Mehta Beverages'
          },
          amount: 25000,
          transaction_id: 'UPI456789123',
          payment_method: 'UPI',
          status: 'failed',
          created_at: '2025-03-22T14:20:00Z',
          updated_at: '2025-03-22T14:25:00Z'
        },
        {
          id: 4,
          application_id: 8,
          application: {
            tracking_id: 'CAMPA-89012',
            full_name: 'Ananya Reddy',
            business_name: 'Reddy Distributors'
          },
          amount: 25000,
          transaction_id: 'UPI789123456',
          payment_method: 'UPI',
          status: 'pending',
          created_at: '2025-03-23T09:45:00Z',
          updated_at: '2025-03-23T09:45:00Z'
        },
        {
          id: 5,
          application_id: 9,
          application: {
            tracking_id: 'CAMPA-90123',
            full_name: 'Karan Malhotra',
            business_name: 'Malhotra Trading'
          },
          amount: 25000,
          transaction_id: 'UPI321654987',
          payment_method: 'UPI',
          status: 'completed',
          created_at: '2025-03-24T11:30:00Z',
          updated_at: '2025-03-24T11:35:00Z'
        }
      ];
      
      setPayments(mockPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  const handleOpenVerifyDialog = (payment) => {
    setSelectedPayment(payment);
    setVerifySuccess(false);
    setVerifyError(null);
    setOpenVerifyDialog(true);
  };
  
  const handleCloseVerifyDialog = () => {
    setOpenVerifyDialog(false);
    setSelectedPayment(null);
  };
  
  const handleVerifyPayment = async () => {
    if (!selectedPayment) return;
    
    setVerifyLoading(true);
    setVerifyError(null);
    
    try {
      // In a real application, this would be an actual API call
      // await paymentApi.updatePayment(selectedPayment.id, {
      //   status: 'completed'
      // });
      
      // For now, we'll just update the local state
      const updatedPayments = payments.map(payment => 
        payment.id === selectedPayment.id 
          ? { ...payment, status: 'completed', updated_at: new Date().toISOString() } 
          : payment
      );
      
      setPayments(updatedPayments);
      setVerifySuccess(true);
      
      // Close dialog after a short delay to show success message
      setTimeout(() => {
        handleCloseVerifyDialog();
      }, 1500);
    } catch (error) {
      console.error('Error verifying payment:', error);
      setVerifyError('Failed to verify payment. Please try again.');
    } finally {
      setVerifyLoading(false);
    }
  };
  
  const handleRejectPayment = async () => {
    if (!selectedPayment) return;
    
    setVerifyLoading(true);
    setVerifyError(null);
    
    try {
      // In a real application, this would be an actual API call
      // await paymentApi.updatePayment(selectedPayment.id, {
      //   status: 'failed'
      // });
      
      // For now, we'll just update the local state
      const updatedPayments = payments.map(payment => 
        payment.id === selectedPayment.id 
          ? { ...payment, status: 'failed', updated_at: new Date().toISOString() } 
          : payment
      );
      
      setPayments(updatedPayments);
      setVerifySuccess(true);
      
      // Close dialog after a short delay to show success message
      setTimeout(() => {
        handleCloseVerifyDialog();
      }, 1500);
    } catch (error) {
      console.error('Error rejecting payment:', error);
      setVerifyError('Failed to reject payment. Please try again.');
    } finally {
      setVerifyLoading(false);
    }
  };
  
  const getStatusChip = (status) => {
    let color;
    let label;
    
    switch(status) {
      case 'pending':
        color = 'warning';
        label = 'Pending';
        break;
      case 'completed':
        color = 'success';
        label = 'Completed';
        break;
      case 'failed':
        color = 'error';
        label = 'Failed';
        break;
      default:
        color = 'default';
        label = status;
    }
    
    return <Chip label={label} color={color} size="small" />;
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  
  // Filter payments based on search term
  const filteredPayments = payments.filter(payment => 
    payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.application.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.application.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Payments Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search Payments"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchPayments}
          >
            Refresh
          </Button>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="payments table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Application</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress size={24} sx={{ my: 2 }} />
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No payments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.transaction_id}</TableCell>
                      <TableCell>{payment.application.tracking_id}</TableCell>
                      <TableCell>
                        {payment.application.full_name}<br />
                        <Typography variant="body2" color="text.secondary">
                          {payment.application.business_name}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatAmount(payment.amount)}</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                      <TableCell>{getStatusChip(payment.status)}</TableCell>
                      <TableCell>{formatDate(payment.created_at)}</TableCell>
                      <TableCell>
                        {payment.status === 'pending' && (
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenVerifyDialog(payment)}
                          >
                            Verify
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Payment Verification Dialog */}
      <Dialog open={openVerifyDialog} onClose={handleCloseVerifyDialog}>
        <DialogTitle>Verify Payment</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Transaction ID: {selectedPayment.transaction_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Application: {selectedPayment.application.tracking_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Applicant: {selectedPayment.application.full_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Business: {selectedPayment.application.business_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Amount: {formatAmount(selectedPayment.amount)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Payment Method: {selectedPayment.payment_method}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Date: {formatDate(selectedPayment.created_at)}
              </Typography>
              
              {verifySuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Payment status updated successfully!
                </Alert>
              )}
              
              {verifyError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {verifyError}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleRejectPayment} 
            color="error"
            startIcon={<CancelIcon />}
            disabled={verifyLoading || verifySuccess}
          >
            Reject
          </Button>
          <Button onClick={handleCloseVerifyDialog}>Cancel</Button>
          <Button 
            onClick={handleVerifyPayment} 
            variant="contained" 
            color="success"
            startIcon={<CheckIcon />}
            disabled={verifyLoading || verifySuccess}
          >
            {verifyLoading ? <CircularProgress size={24} /> : 'Verify Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentsManagement;
