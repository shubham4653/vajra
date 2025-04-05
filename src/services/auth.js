import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error('Request setup error');
    }
  }
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const walletLogin = async (walletAddress) => {
  try {
    const response = await axios.post(`${API_URL}/wallet-login`, { walletAddress });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.log('Wallet login error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    if (error.response?.status === 404) {
      throw new Error('WALLET_NOT_REGISTERED');
    }
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login'; // Redirect to login page
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const addCredential = async (credentialData) => {
  try {
    const response = await axios.post(`${API_URL}/credentials`, credentialData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to add credential');
    }
    throw error;
  }
};

const authService = {
  register,
  login,
  walletLogin,
  logout,
  getCurrentUser,
  addCredential
};

export default authService;
