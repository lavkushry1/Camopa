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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { applicationApi } from '../../utils/api';

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  
  useEffect(() => {
    fetchApplications();
  }, []);
  
  const fetchApplications = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // const response = await applicationApi.getAllApplications();
      // setApplications(response);
      
      // For now, we'll use mock data
      const mockApplications = [
        {
          id: 1,
          tracking_id: 'CAMPA-12345',
          full_name: 'Raj Kumar',
          business_name: 'Raj Enterprises',
          email: 'raj@example.com',
          phone: '9876543210',
          status: 'submitted',
          created_at: '2025-03-15T10:30:00Z',
          updated_at: '2025-03-15T10:30:00Z'
        },
        {
          id: 2,
          tracking_id: 'CAMPA-23456',
          full_name: 'Priya Singh',
          business_name: 'Priya Beverages',
          email: 'priya@example.com',
          phone: '8765432109',
          status: 'under_review',
          created_at: '2025-03-16T11:45:00Z',
          updated_at: '2025-03-17T09:15:00Z'
        },
        {
          id: 3,
          tracking_id: 'CAMPA-34567',
          full_name: 'Amit Patel',
          business_name: 'Patel Distribution',
          email: 'amit@example.com',
          phone: '7654321098',
          status: 'approved',
          created_at: '2025-03-10T14:20:00Z',
          updated_at: '2025-03-18T16:30:00Z'
        },
        {
          id: 4,
          tracking_id: 'CAMPA-45678',
          full_name: 'Sneha Gupta',
          business_name: 'Gupta Traders',
          email: 'sneha@example.com',
          phone: '6543210987',
          status: 'rejected',
          created_at: '2025-03-12T09:10:00Z',
          updated_at: '2025-03-19T11:25:00Z'
        },
        {
          id: 5,
          tracking_id: 'CAMPA-56789',
          full_name: 'Vikram Sharma',
          business_name: 'Sharma Distributors',
          email: 'vikram@example.com',
          phone: '5432109876',
          status: 'additional_info_required',
          created_at: '2025-03-14T15:50:00Z',
          updated_at: '2025-03-20T10:40:00Z'
        }
      ];
      
      setApplications(mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
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
  
  const handleOpenStatusDialog = (application) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setStatusNotes('');
    setOpenStatusDialog(true);
  };
  
  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setSelectedApplication(null);
    setNewStatus('');
    setStatusNotes('');
  };
  
  const handleUpdateStatus = async () => {
    if (!selectedApplication || !newStatus) return;
    
    setStatusLoading(true);
    try {
      // In a real application, this would be an actual API call
      // await applicationApi.updateApplicationStatus(selectedApplication.id, {
      //   status: newStatus,
      //   admin_notes: statusNotes
      // });
      
      // For now, we'll just update the local state
      const updatedApplications = applications.map(app => 
        app.id === selectedApplication.id 
          ? { ...app, status: newStatus, updated_at: new Date().toISOString() } 
          : app
      );
      
      setApplications(updatedApplications);
      handleCloseStatusDialog();
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setStatusLoading(false);
    }
  };
  
  const getStatusChip = (status) => {
    let color;
    let label;
    
    switch(status) {
      case 'submitted':
        color = 'default';
        label = 'Submitted';
        break;
      case 'under_review':
        color = 'primary';
        label = 'Under Review';
        break;
      case 'additional_info_required':
        color = 'warning';
        label = 'Info Required';
        break;
      case 'approved':
        color = 'success';
        label = 'Approved';
        break;
      case 'rejected':
        color = 'error';
        label = 'Rejected';
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
      day: 'numeric'
    });
  };
  
  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Applications Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search Applications"
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
            onClick={fetchApplications}
          >
            Refresh
          </Button>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell>Tracking ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={24} sx={{ my: 2 }} />
                  </TableCell>
                </TableRow>
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.tracking_id}</TableCell>
                      <TableCell>{application.full_name}</TableCell>
                      <TableCell>{application.business_name}</TableCell>
                      <TableCell>
                        {application.email}<br />
                        {application.phone}
                      </TableCell>
                      <TableCell>{getStatusChip(application.status)}</TableCell>
                      <TableCell>{formatDate(application.created_at)}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleOpenStatusDialog(application)}
                        >
                          <EditIcon />
                        </IconButton>
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
          count={filteredApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Status Update Dialog */}
      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <DialogTitle>Update Application Status</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Application: {selectedApplication.tracking_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Applicant: {selectedApplication.full_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Business: {selectedApplication.business_name}
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={newStatus}
                  label="Status"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="under_review">Under Review</MenuItem>
                  <MenuItem value="additional_info_required">Additional Info Required</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                margin="normal"
                label="Notes"
                multiline
                rows={4}
                fullWidth
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add notes about this status change (optional)"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateStatus} 
            variant="contained" 
            color="primary"
            disabled={statusLoading}
          >
            {statusLoading ? <CircularProgress size={24} /> : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationsManagement;
