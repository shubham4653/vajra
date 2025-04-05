import React, { Component } from 'react';
import './Dashboard.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      emailNotifications: true,
      twoFactorAuth: false
    };
  }

  handleToggle = (field) => {
    this.setState(prev => ({ [field]: !prev[field] }));
  }

  render() {
    return (
      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card settings-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <h4>Account Security</h4>
              <p className="stat-value">Strong</p>
              <div className="progress-bg">
                <div className="progress-fill" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="stat-card settings-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h4>Last Backup</h4>
              <p className="stat-value">2 days ago</p>
              <button className="btn small-btn gradient-btn">
                <span>Backup Now</span>
              </button>
            </div>
          </div>
          
          <div className="stat-card settings-card">
            <div className="stat-icon">🛠️</div>
            <div className="stat-content">
              <h4>System Status</h4>
              <p className="stat-value">All Systems OK</p>
              <div className="progress-bg">
                <div className="progress-fill" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <h3>Account Settings</h3>
          <div className="settings-form">
            <h4 className="settings-section-title">Appearance</h4>
            <div className="form-group">
              <label>Dark Mode</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="darkModeToggle" 
                  checked={this.state.darkMode}
                  onChange={() => this.handleToggle('darkMode')}
                />
                <label htmlFor="darkModeToggle" className="toggle-label"></label>
              </div>
            </div>

            <h4 className="settings-section-title">Notifications</h4>
            <div className="form-group">
              <label>Email Notifications</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="emailToggle" 
                  checked={this.state.emailNotifications}
                  onChange={() => this.handleToggle('emailNotifications')}
                />
                <label htmlFor="emailToggle" className="toggle-label"></label>
              </div>
            </div>

            <h4 className="settings-section-title">Security</h4>
            <div className="form-group">
              <label>Change Password</label>
              <button className="btn small-btn gradient-btn">
                Change Password
              </button>
            </div>
            <div className="form-group">
              <label>Two-Factor Authentication</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="twoFactorToggle" 
                  checked={this.state.twoFactorAuth}
                  onChange={() => this.handleToggle('twoFactorAuth')}
                />
                <label htmlFor="twoFactorToggle" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
