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
import { supportApi } from '../../utils/api';

const SupportRequestsManagement = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openResolveDialog, setOpenResolveDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveSuccess, setResolveSuccess] = useState(false);
  const [resolveError, setResolveError] = useState(null);
  
  useEffect(() => {
    fetchSupportRequests();
  }, []);
  
  const fetchSupportRequests = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // const response = await supportApi.getAllSupportRequests();
      // setSupportRequests(response);
      
      // For now, we'll use mock data
      const mockSupportRequests = [
        {
          id: 1,
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          subject: 'Application Status Inquiry',
          message: 'I submitted my application last week but haven\'t received any updates. Could you please check the status?',
          is_resolved: false,
          created_at: '2025-03-25T09:15:00Z',
          updated_at: '2025-03-25T09:15:00Z'
        },
        {
          id: 2,
          name: 'Priya Patel',
          email: 'priya@example.com',
          subject: 'Payment Confirmation',
          message: 'I made a payment for my dealership application yesterday but it still shows as pending. Can you confirm if you received it?',
          is_resolved: true,
          created_at: '2025-03-24T14:30:00Z',
          updated_at: '2025-03-24T16:45:00Z'
        },
        {
          id: 3,
          name: 'Vikram Singh',
          email: 'vikram@example.com',
          subject: 'Unable to Download Approval Letter',
          message: 'I\'m trying to download my approval letter but getting an error. Please help.',
          is_resolved: false,
          created_at: '2025-03-26T11:20:00Z',
          updated_at: '2025-03-26T11:20:00Z'
        },
        {
          id: 4,
          name: 'Neha Gupta',
          email: 'neha@example.com',
          subject: 'Dealership Requirements',
          message: 'I\'m interested in becoming a dealer. Could you please provide more information about the requirements and process?',
          is_resolved: false,
          created_at: '2025-03-27T10:05:00Z',
          updated_at: '2025-03-27T10:05:00Z'
        },
        {
          id: 5,
          name: 'Amit Verma',
          email: 'amit@example.com',
          subject: 'Change Business Address',
          message: 'I need to update my business address in my application. How can I do this?',
          is_resolved: true,
          created_at: '2025-03-23T13:40:00Z',
          updated_at: '2025-03-23T15:20:00Z'
        }
      ];
      
      setSupportRequests(mockSupportRequests);
    } catch (error) {
      console.error('Error fetching support requests:', error);
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
  
  const handleOpenResolveDialog = (request) => {
    setSelectedRequest(request);
    setResolveSuccess(false);
    setResolveError(null);
    setOpenResolveDialog(true);
  };
  
  const handleCloseResolveDialog = () => {
    setOpenResolveDialog(false);
    setSelectedRequest(null);
  };
  
  const handleResolveRequest = async () => {
    if (!selectedRequest) return;
    
    setResolveLoading(true);
    setResolveError(null);
    
    try {
      // In a real application, this would be an actual API call
      // await supportApi.updateSupportRequestStatus(selectedRequest.id, {
      //   is_resolved: true
      // });
      
      // For now, we'll just update the local state
      const updatedRequests = supportRequests.map(request => 
        request.id === selectedRequest.id 
          ? { ...request, is_resolved: true, updated_at: new Date().toISOString() } 
          : request
      );
      
      setSupportRequests(updatedRequests);
      setResolveSuccess(true);
      
      // Close dialog after a short delay to show success message
      setTimeout(() => {
        handleCloseResolveDialog();
      }, 1500);
    } catch (error) {
      console.error('Error resolving support request:', error);
      setResolveError('Failed to resolve request. Please try again.');
    } finally {
      setResolveLoading(false);
    }
  };
  
  const getStatusChip = (isResolved) => {
    return isResolved 
      ? <Chip label="Resolved" color="success" size="small" />
      : <Chip label="Open" color="warning" size="small" />;
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
  
  // Filter support requests based on search term
  const filteredRequests = supportRequests.filter(request => 
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Support Requests Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search Support Requests"
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
            onClick={fetchSupportRequests}
          >
            Refresh
          </Button>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="support requests table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress size={24} sx={{ my: 2 }} />
                  </TableCell>
                </TableRow>
              ) : filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No support requests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.subject}</TableCell>
                      <TableCell>{getStatusChip(request.is_resolved)}</TableCell>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenResolveDialog(request)}
                          disabled={request.is_resolved}
                        >
                          {request.is_resolved ? 'Resolved' : 'View & Resolve'}
                        </Button>
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
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Support Request Dialog */}
      <Dialog 
        open={openResolveDialog} 
        onClose={handleCloseResolveDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Support Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedRequest.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedRequest.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date Submitted
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDate(selectedRequest.created_at)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {getStatusChip(selectedRequest.is_resolved)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedRequest.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Message
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      mt: 1, 
                      mb: 2, 
                      backgroundColor: 'grey.50',
                      minHeight: '100px'
                    }}
                  >
                    <Typography variant="body1">
                      {selectedRequest.message}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {resolveSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Support request marked as resolved successfully!
                </Alert>
              )}
              
              {resolveError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {resolveError}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResolveDialog}>Close</Button>
          {selectedRequest && !selectedRequest.is_resolved && !resolveSuccess && (
            <Button 
              onClick={handleResolveRequest} 
              variant="contained" 
              color="primary"
              disabled={resolveLoading}
            >
              {resolveLoading ? <CircularProgress size={24} /> : 'Mark as Resolved'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportRequestsManagement;
