import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import TrackingPage from './pages/TrackingPage';
import ApplicationDetailsPage from './pages/ApplicationDetailsPage';
import SupportPage from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApplicationsManagement from './pages/admin/ApplicationsManagement';
import PaymentsManagement from './pages/admin/PaymentsManagement';
import ApprovalLettersManagement from './pages/admin/ApprovalLettersManagement';
import SupportRequestsManagement from './pages/admin/SupportRequestsManagement';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplicationPage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/application/:trackingId" element={<ApplicationDetailsPage />} />
          <Route path="/support" element={<SupportPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="applications" element={<ApplicationsManagement />} />
            <Route path="payments" element={<PaymentsManagement />} />
            <Route path="approval-letters" element={<ApprovalLettersManagement />} />
            <Route path="support" element={<SupportRequestsManagement />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
