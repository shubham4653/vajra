import './Login.css'
import Background from './login-page/Background'
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useNavigate } from 'react-router-dom';

// Injected connector for MetaMask
const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export default function Login() {
  const { activate, deactivate, active, account } = useWeb3React();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle MetaMask connection
  const connectMetaMask = async () => {
    setIsLoading(true);
    try {
      // Check if MetaMask extension is installed
      if (!window.ethereum) {
        setErrorMessage('MetaMask extension not detected. Redirecting to install page...');
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
        return;
      }
      
      await activate(injected);
      console.log('MetaMask connected successfully, redirecting...');
      navigate('/create-account');
      setErrorMessage('');
    } catch (error) {
      if (error.message.includes('No Ethereum provider was found')) {
        setErrorMessage('MetaMask extension not detected. Please install MetaMask first.');
      } else {
        setErrorMessage('Failed to connect to MetaMask. Please try again.');
      }
    }
    setIsLoading(false);
  };

  // Disconnect MetaMask
  const disconnectMetaMask = () => {
    deactivate();
    setErrorMessage('');
  };

  return (
    <>
      <Background />
      <div className="container">
        <div className="logo">Vajra</div>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="btn">Login</button>
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

          {/* <button className="social-btn walletconnect">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/WalletConnect_Logo.png" alt="WalletConnect" className="wallet-icon" />
            WalletConnect
          </button>
          <button className="social-btn coinbase">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Coinbase_Logo_2013-2019.png" alt="Coinbase" className="wallet-icon" />
            Coinbase Wallet
          </button> */}
        </div>
      </div>
    </>
  );
}
