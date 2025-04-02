import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as ApprovedIcon,
  HourglassEmpty as PendingIcon,
  SupportAgent as SupportIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { applicationApi, paymentApi, supportApi } from '../../utils/api';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalPayments: 0,
    pendingPayments: 0,
    completedPayments: 0,
    totalRevenue: 0,
    supportRequests: 0,
    unresolvedSupport: 0
  });
  
  // Mock data for charts - in a real app, this would come from the API
  const applicationStatusData = [
    { name: 'Submitted', value: 15 },
    { name: 'Under Review', value: 10 },
    { name: 'Approved', value: 25 },
    { name: 'Rejected', value: 5 }
  ];
  
  const monthlyApplicationsData = [
    { name: 'Jan', applications: 4 },
    { name: 'Feb', applications: 7 },
    { name: 'Mar', applications: 12 },
    { name: 'Apr', applications: 15 },
    { name: 'May', applications: 10 },
    { name: 'Jun', applications: 8 }
  ];
  
  const revenueData = [
    { name: 'Jan', revenue: 100000 },
    { name: 'Feb', revenue: 175000 },
    { name: 'Mar', revenue: 300000 },
    { name: 'Apr', revenue: 375000 },
    { name: 'May', revenue: 250000 },
    { name: 'Jun', revenue: 200000 }
  ];
  
  const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be actual API calls
        // const applicationsData = await applicationApi.getApplicationStats();
        // const paymentsData = await paymentApi.getPaymentStats();
        // const supportData = await supportApi.getSupportStats();
        
        // For now, we'll use mock data
        setStats({
          totalApplications: 55,
          pendingApplications: 25,
          approvedApplications: 25,
          rejectedApplications: 5,
          totalPayments: 30,
          pendingPayments: 5,
          completedPayments: 25,
          totalRevenue: 625000,
          supportRequests: 15,
          unresolvedSupport: 3
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalApplications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ApprovedIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.approvedApplications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approved Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <MoneyIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <SupportIcon sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.supportRequests}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Support Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Applications
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyApplicationsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Application Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {/* This would be populated with actual data in a real application */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">
              New application received from Raj Enterprises
            </Typography>
            <Chip label="New" color="primary" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            2 hours ago
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">
              Payment received for application #CAMPA-12345
            </Typography>
            <Chip label="Payment" color="success" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            5 hours ago
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1">
              Application #CAMPA-54321 approved by admin
            </Typography>
            <Chip label="Approved" color="success" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Yesterday
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="outlined" color="primary">
            View All Activity
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
