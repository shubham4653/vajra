import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, formatEther, ethers } from 'ethers';
import './Dashboard.css';

const contractAddress = "0x03C1b162DceF98d89Bbb05886410765642f1603a";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const Info = ({ account }) => {
  const [ethBalance, setEthBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [burnAmount, setBurnAmount] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalances = async () => {
      if (account) {
        // Get Sepolia ETH balance
        const provider = ethers.getDefaultProvider('sepolia');
        const balance = await provider.getBalance(account);
        const ethBalance = formatEther(balance);
        setEthBalance(ethBalance);

        // Check if balance is below threshold
        if (parseFloat(ethBalance) < 0.5) {
          navigate('/low-balance');
          return;
        }

        // Get token balance
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const tokens = await contract.balanceOf(account);
        setTokenBalance(formatEther(tokens));
      }
    };

    fetchBalances();
  }, [account]);

  const handleBurnTokens = async () => {
    if (window.ethereum && burnAmount > 0) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        // Note: Need burn function in ABI - currently only balanceOf is available
        // const tx = await contract.burn(ethers.utils.parseEther(burnAmount));
        // await tx.wait();
        alert('Token burning functionality would go here');
      } catch (error) {
        console.error('Error burning tokens:', error);
      }
    }
  };

  return (
    <div className="info-container">
      <h3>Wallet Information</h3>
      <div className="info-card">
        <p><strong>Wallet Address:</strong> {account}</p>
        <p><strong>Sepolia ETH Balance:</strong> {ethBalance}</p>
        <p><strong>Token Balance:</strong> {tokenBalance*10}</p>
      </div>

      <div className="burn-section">
        <h4>Burn Tokens</h4>
        <input
          type="number"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
          placeholder="Amount to burn"
        />
        <button 
          className="btn danger-btn"
          onClick={handleBurnTokens}
        >
          Burn Tokens
        </button>
      </div>
    </div>
  );
};

export default Info;
