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
            <label>Amount</label>
            <div className="amount-control">
              <button 
                type="button" 
                className="amount-btn minus"
                onClick={() => this.setState(prev => ({ amount: Math.max(1, (parseInt(prev.amount) || 0) - 1) }))}
                onMouseDown={this.startDecrement}
                onMouseUp={this.clearInterval}
                onMouseLeave={this.clearInterval}
                onTouchStart={this.startDecrement}
                onTouchEnd={this.clearInterval}
              >
                -
              </button>
              <input
                type="number"
                name="amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Enter amount"
                min="1"
                required
              />
              <button 
                type="button" 
                className="amount-btn plus"
                onClick={() => this.setState(prev => ({ amount: (parseInt(prev.amount) || 0) + 1 }))}
                onMouseDown={this.startIncrement}
                onMouseUp={this.clearInterval}
                onMouseLeave={this.clearInterval}
                onTouchStart={this.startIncrement}
                onTouchEnd={this.clearInterval}
              >
                +
              </button>
            </div>
          </div>

          <div className="token-summary">
            You are purchasing: {this.state.amount || 0} {this.state.selectedToken} tokens
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
