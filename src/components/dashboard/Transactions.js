import React, { useState, useEffect } from 'react';
import './Transactions.css';
import { formatEther, parseEther } from 'ethers';

const Transactions = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        // Replace with actual blockchain transaction fetching logic
        const mockTransactions = [
          { 
            hash: '0x123...456',
            type: 'Buy', 
            token: 'VAJRA', 
            amount: 100, 
            value: parseEther('0.1'),
            date: new Date('2023-05-15'), 
            status: 'Confirmed',
            block: 1234567
          },
          { 
            hash: '0x789...012',
            type: 'Sell', 
            token: 'VAJRA', 
            amount: 50, 
            value: parseEther('0.05'),
            date: new Date('2023-05-14'), 
            status: 'Confirmed',
            block: 1234566
          }
        ];
        
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (account) {
      fetchTransactionHistory();
    }
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
