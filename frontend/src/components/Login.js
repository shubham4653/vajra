import './Login.css';
import Background from './login-page/Background';
import { useState, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther, ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { AuthContext } from '../App';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export default function Login() {
  const { activate, deactivate, active, account } = useWeb3React();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const connectMetaMask = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      if (!window.ethereum) {
        const shouldInstall = window.confirm(
          'MetaMask extension not detected. Would you like to install it now?'
        );
        if (shouldInstall) {
          window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
        }
        return;
      }

      if (active && account) {
        // Check if wallet is registered
        try {
        const userData = await authService.walletLogin(account);
        setUser(userData.user);
        setIsAuthenticated(true);

        // Check ETH balance
        const balance = await checkEthBalance(account);
        if (balance < 0.5) {
          navigate('/low-balance');
          return;
        }
        
        navigate('/dashboard');
          return;
        } catch (error) {
          console.log('Wallet login error:', error); // Debug log
          if (error.message === 'WALLET_NOT_REGISTERED') {
            console.log('Redirecting to create account with wallet:', account); // Debug log
            navigate(`/create-account?wallet=${encodeURIComponent(account)}`);
            return;
          }
          console.error('Error during wallet login:', error);
          setErrorMessage('Login failed. Please try again.');
        }
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        await activate(injected);
        console.log('MetaMask connected:', accounts[0]);
        
        // Check if wallet is registered
        try {
          const userData = await authService.walletLogin(accounts[0]);
          setUser(userData.user);
          setIsAuthenticated(true);

          // Check ETH balance
          const balance = await checkEthBalance(accounts[0]);
          if (balance < 0.5) {
            navigate('/low-balance');
            return;
          }
          
          navigate('/dashboard');
        } catch (error) {
          if (error.message === 'WALLET_NOT_REGISTERED') {
            navigate(`/create-account?wallet=${encodeURIComponent(accounts[0])}`);
            return;
          }
          console.error('Error during wallet login:', error);
          setErrorMessage('Login failed. Please try again.');
        }
      } else {
        setErrorMessage('Please authorize account access in MetaMask');
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
      if (error.code === 4001) {
        setErrorMessage('MetaMask connection rejected by user');
      } else if (error.code === -32002) {
        setErrorMessage('MetaMask connection already in progress. Check your extension.');
      } else {
        setErrorMessage(`Connection error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectMetaMask = () => {
    deactivate();
    setErrorMessage('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const checkEthBalance = async (address) => {
    const provider = ethers.getDefaultProvider('sepolia');
    const balance = await provider.getBalance(address);
    return parseFloat(formatEther(balance));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');
    
    try {
      const userData = await authService.login({
        username: formData.email,
        password: formData.password
      });
      setUser(userData.user);
      setIsAuthenticated(true);

      // Check if user has wallet address and balance
      if (userData.user.walletAddress) {
        const balance = await checkEthBalance(userData.user.walletAddress);
        if (balance < 0.5) {
          navigate('/low-balance');
          return;
        }
      }
      
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Background />
      <div className="container">
        <div className="logo">Vajra</div>
        <form onSubmit={handleSubmit}>
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
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button 
            type="submit" 
            className="btn"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="link">New here?</div>
        <div className="social-login">
          <div>
            {!active ? (
              <button className="social-btn metamask" onClick={connectMetaMask} disabled={isLoading}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="wallet-icon" />
                {isLoading ? 'Connecting...' : 'Connect with MetaMask'}
              </button>
            ) : (
              <div>
                <p>Connected Account: {account}</p>
                <button onClick={disconnectMetaMask}>Disconnect</button>
              </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
