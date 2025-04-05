import React, { useState } from 'react';
import './Referrals.css';

const Referrals = () => {
  const [userCode, setUserCode] = useState('VAJRA-X7B9-2K4M');
  const [inputCode, setInputCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userCode);
    alert('Referral code copied to clipboard!');
  };

  const verifyCode = () => {
    // Mock verification - in real app this would call an API
    if (inputCode.length === 12) {
      setVerificationResult({ valid: true, message: 'Referral code is valid!' });
    } else {
      setVerificationResult({ valid: false, message: 'Invalid referral code' });
    }
  };

  return (
    <div className="referrals-container">
      <h2>Referral Program</h2>
      
      <div className="referral-section">
        <h3>Your Referral Code</h3>
        <div className="code-display">
          <span>{userCode}</span>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
        <p className="info-text">Share this code with friends to earn rewards</p>
      </div>

      <div className="referral-section">
        <h3>Enter Referral Code</h3>
        <div className="code-input">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter referral code"
            maxLength="12"
          />
          <button onClick={verifyCode}>Verify</button>
        </div>
        {verificationResult && (
          <p className={`verification-result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
            {verificationResult.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Referrals;
