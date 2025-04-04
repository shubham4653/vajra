import React, { Component } from 'react'
import './Dashboard.css'
import Background from '../login-page/Background'
import BuyTokens from './BuyTokens'
import { Transaction } from 'ethers';
import Transactions from './Transactions';
import Referrals from './Referrals';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'dashboard'
    };
  }

  handleNavClick = (section) => {
    this.setState({ activeSection: section });
  }

  renderContent() {
    switch (this.state.activeSection) {
      case 'buy-tokens':
        return <BuyTokens />;
      case 'transactions':
        return <Transactions />;
      case 'referrals':
        return <Referrals />;
      case 'dashboard':
      default:
        return (
          <div className="table-container">
            <h3>Hello User</h3>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
          </div>
        );
    }
  }

  render() {
    return (
      <>
        {/* <Background /> */}
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
              >Transactions</a>
              <a
                href="#referrals"
                className={this.state.activeSection === 'referrals' ? 'active' : ''}
                onClick={() => this.handleNavClick('referrals')}
              >Referrals</a>
              <a href="#AIchat">AI Chat</a>
              <a href="#settings">Settings</a>
            </nav>
          </div>

          <div className="content">
            <div className="top-nav">
              <h2>Dashboard</h2>
              <div className="user-actions">
                <button className="btn profile-btn">Profile</button>
                <button className="btn logout-btn">Logout</button>
              </div>
            </div>

            {this.renderContent()}
          </div>
        </div>
      </>
    )
  }
}
