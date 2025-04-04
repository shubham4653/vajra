import React, { Component } from 'react'
import './Login.css'
import Background from './login-page/Background'
export default class Login extends Component {
  render() {
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
          <button className="social-btn metamask">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="wallet-icon" />
            Connect with MetaMask
          </button>
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
    )
  }
}
