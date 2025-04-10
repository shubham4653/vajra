import './CreateAcc.css';
import Background from './login-page/Background';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { AuthContext } from '../App';

export default function CreateAcc() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    walletAddress: '' // Added wallet address field
  });

  // Get wallet address from URL params if coming from MetaMask flow
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const walletAddress = params.get('wallet');
    if (walletAddress) {
      setFormData(prev => ({...prev, walletAddress}));
    }
  }, []);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsRegistering(false);
      return;
    }

    try {
      const userData = await authService.register({
        walletAddress: formData.walletAddress,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      // Add wallet credential if coming from MetaMask flow
      if (formData.walletAddress) {
        await authService.addCredential({
          userId: userData.user.id,
          type: 'wallet',
          value: formData.walletAddress
        });
      }
      setUser(userData.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <Background />
      <div className="container">
        <div className="logo">Vajra</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button 
            type="submit" 
            className="btn"
            disabled={isRegistering}
          >
            {isRegistering ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className="link">Already have an account?</div>
      </div>
    </>
  );
}
