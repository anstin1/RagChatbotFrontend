// API service for backend communication
import axios from 'axios';

// Set a global timeout to prevent hanging requests
axios.defaults.timeout = 60000; // Render cold starts can take >20s
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Use relative URLs by default to leverage CRA proxy during local dev
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const api = {
  // Session management
  createSession: async () => {
    const response = await axios.post(`${API_BASE_URL}/api/sessions`, {});
    return response.data;
  },

  getSessionHistory: async (sessionId) => {
    const response = await axios.get(`${API_BASE_URL}/api/sessions/${sessionId}/history`);
    return response.data;
  },

  clearSession: async (sessionId) => {
    const response = await axios.delete(`${API_BASE_URL}/api/sessions/${sessionId}`);
    return response.data;
  },

  // Chat
  sendMessage: async (sessionId, message) => {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, { sessionId, message });
    return response.data;
  },

  // Health check
  checkHealth: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/health`);
    return response.data;
  }
};
