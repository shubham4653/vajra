import React, { useState } from 'react';
import { ethers } from 'ethers';
import './Dashboard.css';

// You can also move this to a constants file
const CONTRACT_ADDRESS = '0x1F4dC8f771EC1D7344201e18753E2337CfC25854';
const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'buyTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  }
  // Add other ABI items here if needed
];

const BuyTokens = ({ account }) => {
  const [tokenAmount, setTokenAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const buyTokens = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      if (!account) {
        throw new Error('No wallet connected');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const { chainId } = await provider.getNetwork();

      if (chainId !== 11155111n) {
        throw new Error('Please switch to the Sepolia network in MetaMask');
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const ethAmount = tokenAmount * 0.001;

      const tx = await contract.buyTokens({
        value: ethers.parseEther(ethAmount.toString()),
        gasLimit: 300000,
      });

      setTransactionHash(tx.hash);

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        alert(`✅ Success! Purchased ${tokenAmount} tokens for ${ethAmount} ETH`);
      } else {
        throw new Error('Transaction failed');
      }

    } catch (error) {
      console.error('Error buying tokens:', error);
      alert(`❌ Error: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-purchase-section">
      <h3>Token Purchase</h3>

      <div className="wallet-info">
        <p><strong>Connected Wallet:</strong> {account || 'Not connected'}</p>
        <p><strong>Contract Address:</strong> {CONTRACT_ADDRESS}</p>
        <p className="notice">1 Token = 0.001 ETH (Sepolia)</p>
      </div>

      <div className="form-group">
        <label>Number of Tokens to Buy:</label>
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="100"
          min="1"
          step="1"
          className="token-input"
        />
        <p className="eth-amount">
          {tokenAmount ? `= ${tokenAmount * 0.001} ETH` : ''}
        </p>
        <button 
          onClick={buyTokens} 
          disabled={loading || !tokenAmount || !account}
          className="gradient-btn"
        >
          {loading ? 'Processing...' : 'Buy Tokens'}
        </button>
      </div>

      {transactionHash && (
        <div className="transaction-receipt">
          <p>Transaction submitted!</p>
          <a 
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
};

export default BuyTokens;
