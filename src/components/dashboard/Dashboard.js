import React, { Component } from 'react';
import './Dashboard.css';
import BuyTokens from './BuyTokens';
import Transactions from './Transactions';
import Referrals from './Referrals';
import AIChat from './AIChat';
import Settings from './Settings';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'dashboard',
      account: null,
      firstName: ''
    };
  }

  componentDidMount() {
    // Get wallet account
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            this.setState({ account: accounts[0] });
          }
        });
    }

    // Get first name from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length > 0) {
      this.setState({ firstName: users[users.length - 1].fname });
    }
  }

  handleNavClick = (section) => {
    this.setState({ activeSection: section });
  }

  renderContent() {
    switch (this.state.activeSection) {
      case 'buy-tokens': return <BuyTokens />;
      case 'transactions': return <Transactions account={this.state.account} />;
      case 'referrals': return <Referrals />;
      case 'ai-chat': return <AIChat />;
      case 'settings': return <Settings />;
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
          
          <div className="table-container">
            <h3>Hello User</h3>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
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
              Buy Tokens
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
          </nav>
        </div>

        <div className="content">
          <div className="top-nav">
            <h2>Dashboard</h2>
            <div className="user-actions">
              {this.state.firstName && <span className="welcome-message">Hey, {this.state.firstName}</span>}
              <button className="btn profile-btn">Profile</button>
              <button className="btn logout-btn">Logout</button>
            </div>
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
