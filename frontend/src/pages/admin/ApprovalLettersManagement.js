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
  Download as DownloadIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { applicationApi } from '../../utils/api';

const ApprovalLettersManagement = () => {
  const [approvalLetters, setApprovalLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateSuccess, setGenerateSuccess] = useState(false);
  const [generateError, setGenerateError] = useState(null);
  
  useEffect(() => {
    fetchApprovalLetters();
  }, []);
  
  const fetchApprovalLetters = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an actual API call
      // const response = await applicationApi.getAllApprovalLetters();
      // setApprovalLetters(response);
      
      // For now, we'll use mock data
      const mockApprovalLetters = [
        {
          id: 1,
          application_id: 3,
          application: {
            tracking_id: 'CAMPA-34567',
            full_name: 'Amit Patel',
            business_name: 'Patel Distribution',
            status: 'approved'
          },
          file_path: '/approvals/CAMPA-34567-approval.pdf',
          created_at: '2025-03-18T16:45:00Z'
        },
        {
          id: 2,
          application_id: 10,
          application: {
            tracking_id: 'CAMPA-10111',
            full_name: 'Sanjay Kapoor',
            business_name: 'Kapoor Beverages',
            status: 'approved'
          },
          file_path: '/approvals/CAMPA-10111-approval.pdf',
          created_at: '2025-03-25T10:30:00Z'
        },
        {
          id: 3,
          application_id: 12,
          application: {
            tracking_id: 'CAMPA-12131',
            full_name: 'Meera Joshi',
            business_name: 'Joshi Enterprises',
            status: 'approved'
          },
          file_path: '/approvals/CAMPA-12131-approval.pdf',
          created_at: '2025-03-26T14:15:00Z'
        }
      ];
      
      // Also include approved applications without approval letters
      const approvedApplicationsWithoutLetters = [
        {
          id: 15,
          tracking_id: 'CAMPA-15161',
          full_name: 'Rajiv Khanna',
          business_name: 'Khanna Distributors',
          status: 'approved',
          created_at: '2025-03-27T09:20:00Z',
          updated_at: '2025-03-28T11:30:00Z'
        }
      ];
      
      setApprovalLetters(mockApprovalLetters);
    } catch (error) {
      console.error('Error fetching approval letters:', error);
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
  
  const handleOpenGenerateDialog = (application) => {
    setSelectedApplication(application);
    setGenerateSuccess(false);
    setGenerateError(null);
    setOpenGenerateDialog(true);
  };
  
  const handleCloseGenerateDialog = () => {
    setOpenGenerateDialog(false);
    setSelectedApplication(null);
  };
  
  const handleGenerateApprovalLetter = async () => {
    if (!selectedApplication) return;
    
    setGenerateLoading(true);
    setGenerateError(null);
    
    try {
      // In a real application, this would be an actual API call
      // const response = await applicationApi.generateApprovalLetter(selectedApplication.id);
      // const newApprovalLetter = response;
      
      // For now, we'll just simulate adding a new approval letter
      const newApprovalLetter = {
        id: Date.now(),
        application_id: selectedApplication.id,
        application: {
          tracking_id: selectedApplication.tracking_id,
          full_name: selectedApplication.full_name,
          business_name: selectedApplication.business_name,
          status: 'approved'
        },
        file_path: `/approvals/${selectedApplication.tracking_id}-approval.pdf`,
        created_at: new Date().toISOString()
      };
      
      setApprovalLetters([...approvalLetters, newApprovalLetter]);
      setGenerateSuccess(true);
      
      // Close dialog after a short delay to show success message
      setTimeout(() => {
        handleCloseGenerateDialog();
      }, 1500);
    } catch (error) {
      console.error('Error generating approval letter:', error);
      setGenerateError('Failed to generate approval letter. Please try again.');
    } finally {
      setGenerateLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Filter approval letters based on search term
  const filteredApprovalLetters = approvalLetters.filter(letter => 
    letter.application.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.application.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Approval Letters Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search Approval Letters"
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
            onClick={fetchApprovalLetters}
          >
            Refresh
          </Button>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="approval letters table">
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Generated Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={24} sx={{ my: 2 }} />
                  </TableCell>
                </TableRow>
              ) : filteredApprovalLetters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No approval letters found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApprovalLetters
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((letter) => (
                    <TableRow key={letter.id}>
                      <TableCell>{letter.application.tracking_id}</TableCell>
                      <TableCell>{letter.application.full_name}</TableCell>
                      <TableCell>{letter.application.business_name}</TableCell>
                      <TableCell>{formatDate(letter.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          href={letter.file_path}
                          target="_blank"
                        >
                          Download
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
          count={filteredApprovalLetters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Generate New Approval Letter
        </Typography>
        <Typography variant="body2" paragraph>
          Select an approved application to generate a new approval letter.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            // In a real application, this would open a dialog to select from approved applications
            // For now, we'll just simulate with a mock application
            handleOpenGenerateDialog({
              id: 15,
              tracking_id: 'CAMPA-15161',
              full_name: 'Rajiv Khanna',
              business_name: 'Khanna Distributors'
            });
          }}
        >
          Generate New Letter
        </Button>
      </Paper>
      
      {/* Generate Approval Letter Dialog */}
      <Dialog open={openGenerateDialog} onClose={handleCloseGenerateDialog}>
        <DialogTitle>Generate Approval Letter</DialogTitle>
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
              
              <Typography variant="body2" sx={{ mt: 2 }}>
                Are you sure you want to generate an approval letter for this application?
              </Typography>
              
              {generateSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Approval letter generated successfully!
                </Alert>
              )}
              
              {generateError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {generateError}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenerateDialog}>Cancel</Button>
          <Button 
            onClick={handleGenerateApprovalLetter} 
            variant="contained" 
            color="primary"
            disabled={generateLoading || generateSuccess}
          >
            {generateLoading ? <CircularProgress size={24} /> : 'Generate Letter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApprovalLettersManagement;
