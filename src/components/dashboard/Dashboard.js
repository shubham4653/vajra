import React, { Component } from 'react';
import Web3 from 'web3';
import './Dashboard.css';
import BuyTokens from './BuyTokens';
import Transactions from './Transactions';
import Referrals from './Referrals';
import AIChat from './AIChat';
import Settings from './Settings';
import Info from './Info';
import authService from '../../services/auth';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'dashboard',
      account: null,
      firstName: '',
      balance: '0',
      network: 'Not Connected',
      transactionCount: 0,
      tokenValue: '0'
    };
    
    // Initialize Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    }
  }

  async componentDidMount() {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.firstName) {
      this.setState({ firstName: user.firstName });
    }

    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          this.setState({ account: accounts[0] });
          this.fetchWalletData(accounts[0]);
        }

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            this.setState({ account: accounts[0] });
            this.fetchWalletData(accounts[0]);
          } else {
            this.setState({ 
              account: null,
              balance: '0',
              network: 'Not Connected',
              transactionCount: 0
            });
          }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

      } catch (error) {
        console.error('User denied account access', error);
      }
    }
  }

  async fetchWalletData(account) {
    try {
      // Get network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const network = this.getNetworkName(chainId);
      
      // Get balance (in wei)
      const balance = await window.ethereum.request({ 
        method: 'eth_getBalance', 
        params: [account, 'latest'] 
      });
      
      // Convert wei to ether
      const etherBalance = window.web3.utils.fromWei(balance, 'ether');
      
      // Get transaction count
      const txCount = await window.ethereum.request({
        method: 'eth_getTransactionCount',
        params: [account, 'latest']
      });

      this.setState({
        network,
        balance: etherBalance,
        transactionCount: parseInt(txCount),
        tokenValue: (parseFloat(etherBalance) * 0.1).toFixed(2) // Example conversion rate
      });

    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  }

  getNetworkName(chainId) {
    switch (chainId) {
      case '0x1': return 'Ethereum Mainnet';
      case '0x3': return 'Ropsten Testnet';
      case '0x4': return 'Rinkeby Testnet';
      case '0x5': return 'Goerli Testnet';
      case '0x2a': return 'Kovan Testnet';
      default: return 'Unknown Network';
    }
  }

  handleNavClick = (section) => {
    this.setState({ activeSection: section });
  }

  renderContent() {
    switch (this.state.activeSection) {
      case 'buy-tokens': return <BuyTokens 
        account={this.state.account}
        contractAddress="0x4B8BEB8c7f6F70FA329e795E0aBacEBb6CD4D08e"
        contractABI={[
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_token",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "buyTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "rate",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "token",
            "outputs": [
              {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]}
      />;
      case 'transactions': return <Transactions account={this.state.account} />;
      case 'referrals': return <Referrals />;
      case 'ai-chat': return <AIChat />;
      case 'settings': return <Settings />;
      case 'info': return <Info account={this.state.account} />;
      default: return (
        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-card token-card">
              <div className="stat-icon">🪙</div>
              <div className="stat-content">
                <h4>Tokens Remaining</h4>
                <p className="stat-value">1,250</p>
                <div className="progress-bg">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="stat-card api-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h4>API Requests</h4>
                <p className="stat-value">42/100</p>
                <div className="progress-bg">
                  <div className="progress-fill" style={{width: '42%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="stat-card management-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-content">
                <h4>Token Management</h4>
                <button className="btn small-btn gradient-btn">
                  <span>+ Add Tokens</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div className="wallet-card">
              <Info account={this.state.account} />
            </div>

            
            
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn gradient-btn">
                  <span>Buy More Tokens</span>
                </button>
                <button className="btn outline-btn">
                  <span>View Transactions</span>
                </button>
                <button className="btn outline-btn">
                  <span>Share Referral</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="sidebar">
          <h2>Vajra</h2>
          <nav>
            <a
              href="#dashboard"
              className={this.state.activeSection === 'dashboard' ? 'active' : ''}
              onClick={() => this.handleNavClick('dashboard')}
            >
              Dashboard
            </a>
            <a
              href="#buy-tokens"
              className={this.state.activeSection === 'buy-tokens' ? 'active' : ''}
              onClick={() => this.handleNavClick('buy-tokens')}
            >
              Buy Tokens (Sepolia)
            </a>
            <a
              href="#transactions"
              className={this.state.activeSection === 'transactions' ? 'active' : ''}
              onClick={() => this.handleNavClick('transactions')}
            >
              Transactions
            </a>
            <a
              href="#referrals"
              className={this.state.activeSection === 'referrals' ? 'active' : ''}
              onClick={() => this.handleNavClick('referrals')}
            >
              Referrals
            </a>
            <a
              href="#ai-chat"
              className={this.state.activeSection === 'ai-chat' ? 'active' : ''}
              onClick={() => this.handleNavClick('ai-chat')}
            >
              AI Chat
            </a>
            <a href="#settings" className={this.state.activeSection === 'settings' ? 'active' : ''}
              onClick={() => this.handleNavClick('settings')}>Settings</a>
            <a
              href="#info"
              className={this.state.activeSection === 'info' ? 'active' : ''}
              onClick={() => this.handleNavClick('info')}
            >
              Wallet Info
            </a>
          </nav>
        </div>

        <div className="content">
          <div className="top-nav">
            <h2>Dashboard</h2>
            <div className="user-actions">
              {this.state.firstName && <span className="welcome-message">Hey, {this.state.firstName}</span>}
              <button className="btn profile-btn">Profile</button>
              <button 
                className="btn logout-btn"
                onClick={() => authService.logout()}
              >
                Logout
              </button>
            </div>
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
