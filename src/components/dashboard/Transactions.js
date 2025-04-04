import React from 'react';
import './Transactions.css';

const Transactions = () => {
  const transactions = [
    { id: 1, type: 'Buy', token: 'VAJRA', amount: 100, date: '2023-05-15', status: 'Completed' },
    { id: 2, type: 'Sell', token: 'VAJRA', amount: 50, date: '2023-05-14', status: 'Completed' },
    { id: 3, type: 'Buy', token: 'ETH', amount: 2, date: '2023-05-13', status: 'Pending' }
  ];

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      <div className="transactions-table">
        <div className="table-header">
          <div>Type</div>
          <div>Token</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        {transactions.map(tx => (
          <div key={tx.id} className="table-row">
            <div className={`tx-type ${tx.type.toLowerCase()}`}>{tx.type}</div>
            <div>{tx.token}</div>
            <div>{tx.amount}</div>
            <div>{tx.date}</div>
            <div className={`status ${tx.status.toLowerCase()}`}>{tx.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
