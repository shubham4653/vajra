import React, { useState, useEffect } from 'react';
import './Transactions.css';
import { BrowserProvider, formatEther } from 'ethers';

const Transactions = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        if (!account) {
          setError('Wallet not connected');
          setIsLoading(false);
          return;
        }

        // Initialize provider
        console.log('Initializing provider...');
        const provider = new BrowserProvider(window.ethereum);
        
        // Get network
        console.log('Getting network info...');
        const network = await provider.getNetwork();
        console.log('Network:', network);
        
        // Fetch transactions using Etherscan API
        console.log('Fetching transactions for account:', account);
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=56UCI8KEPH59ZHPNV8TP634TXXFSW8AF8M`
        );
        
        console.log('API response status:', response.status);
        const data = await response.json();
        console.log('API response data:', data);
        
        if (data.status !== '1') {
          const errorMsg = data.message || 'Failed to fetch transactions';
          console.error('Etherscan API error:', errorMsg, data);
          throw new Error(errorMsg);
        }

        // Format transactions
        const formattedTxs = data.result.map(tx => ({
          hash: tx.hash,
          type: tx.from.toLowerCase() === account.toLowerCase() ? 'Send' : 'Receive',
          token: 'ETH',
          amount: formatEther(tx.value),
          value: tx.value,
          date: new Date(tx.timeStamp * 1000),
          status: tx.isError === '0' ? 'Confirmed' : 'Failed',
          block: tx.blockNumber
        }));

        setTransactions(formattedTxs);
        setError(null);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [account]);

  const formatDate = (date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatValue = (value) => {
    return formatEther(value) + ' ETH';
  };

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      {isLoading ? (
        <div className="loading">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="no-transactions">No transactions found</div>
      ) : (
        <div className="transactions-table">
          <div className="table-header">
            <div>Type</div>
            <div>Token</div>
            <div>Amount</div>
            <div>Value</div>
            <div>Date</div>
            <div>Status</div>
            <div>Details</div>
          </div>
          {transactions.map(tx => (
            <div key={tx.hash} className="table-row">
              <div className={`tx-type ${tx.type.toLowerCase()}`}>{tx.type}</div>
              <div>{tx.token}</div>
              <div>{tx.amount}</div>
              <div>{formatValue(tx.value)}</div>
              <div>{formatDate(tx.date)}</div>
              <div className={`status ${tx.status.toLowerCase()}`}>{tx.status}</div>
              <div>
                <a 
                  href={`https://etherscan.io/tx/${tx.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
