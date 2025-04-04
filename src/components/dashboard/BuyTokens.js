import React, { Component } from 'react';
import './BuyTokens.css';

class BuyTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToken: 'VAJRA',
      amount: '',
      paymentMethod: 'credit_card'
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle token purchase logic here
    console.log('Purchasing:', this.state);
  }

  render() {
    return (
      <div className="buy-tokens-container">
        <h2>Buy Tokens</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Token Type</label>
            <select
              name="selectedToken"
              value={this.state.selectedToken}
              onChange={this.handleInputChange}
            >
              <option value="VAJRA">VAJRA</option>
              <option value="CLASS">CLASS</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleInputChange}
              placeholder="Enter amount"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              name="paymentMethod"
              value={this.state.paymentMethod}
              onChange={this.handleInputChange}
            >
              <option value="credit_card">Credit Card</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <button type="submit" className="buy-btn">
            Buy Tokens
          </button>
        </form>
      </div>
    );
  }
}

export default BuyTokens;
