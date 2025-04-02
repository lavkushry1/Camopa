import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Application API calls
export const applicationApi = {
  // Submit a new application
  submitApplication: async (applicationData) => {
    try {
      const response = await api.post('/applications/', applicationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get application by tracking ID
  getApplicationByTrackingId: async (trackingId) => {
    try {
      const response = await api.get(`/applications/tracking/${trackingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get all applications (admin only)
  getAllApplications: async () => {
    try {
      const response = await api.get('/applications/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update application status (admin only)
  updateApplicationStatus: async (applicationId, statusData) => {
    try {
      const response = await api.patch(`/applications/${applicationId}`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Payment API calls
export const paymentApi = {
  // Create a new payment
  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/', paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get payments by application ID
  getPaymentsByApplication: async (applicationId) => {
    try {
      const response = await api.get(`/payments/application/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update payment status (admin only)
  updatePaymentStatus: async (paymentId, statusData) => {
    try {
      const response = await api.patch(`/payments/${paymentId}`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Approval Letter API calls
export const approvalLetterApi = {
  // Get approval letter by application ID
  getApprovalLetter: async (applicationId) => {
    try {
      const response = await api.get(`/approval-letters/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create approval letter (admin only)
  createApprovalLetter: async (letterData) => {
    try {
      const response = await api.post('/approval-letters/', letterData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Support API calls
export const supportApi = {
  // Submit a support request
  submitSupportRequest: async (requestData) => {
    try {
      const response = await api.post('/support/', requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get all support requests (admin only)
  getAllSupportRequests: async () => {
    try {
      const response = await api.get('/support/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update support request status (admin only)
  updateSupportRequestStatus: async (requestId, statusData) => {
    try {
      const response = await api.patch(`/support/${requestId}`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
