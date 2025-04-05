import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Background from './login-page/Background';
import './CreateAcc.css';

export default function CreateAcc() {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    walletAddress: account || ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Save form data to local JSON file
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save account locally: ' + err.message);
    }
  };

  return (
    <div>
      <Background />
      <div className="container">
        <div className="logo">Create Account</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group input-group-2 input-22">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group input-group-2">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}
