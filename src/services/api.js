// API service for backend communication
import axios from 'axios';

// Use relative URLs to avoid embedding environment variables in build output
// This prevents secrets scanning from detecting URLs in the compiled JavaScript

// Set a global timeout to prevent hanging requests
axios.defaults.timeout = 20000;
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const api = {
  // Session management
  createSession: async () => {
    const response = await axios.post('/api/sessions');
    return response.data;
  },

  getSessionHistory: async (sessionId) => {
    const response = await axios.get(`/api/sessions/${sessionId}/history`);
    return response.data;
  },

  clearSession: async (sessionId) => {
    const response = await axios.delete(`/api/sessions/${sessionId}`);
    return response.data;
  },

  // Chat
  sendMessage: async (sessionId, message) => {
    const response = await axios.post('/api/chat', { sessionId, message });
    return response.data;
  },

  // Health check
  checkHealth: async () => {
    const response = await axios.get('/api/health');
    return response.data;
  }
};
