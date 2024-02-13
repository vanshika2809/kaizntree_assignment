// src/components/CreateAccount.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css';
import kaizntreeLogo from '../assets/kaizntreeLogo.png';

const CreateAccount = () => {
  const [accountDetails, setAccountDetails] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual create account API endpoint
      await axios.post('http://localhost:8000/api/register/', accountDetails);
      navigate('/login'); // Redirect to login after account creation
    } catch (error) {
      console.error('Account creation failed:', error.response);
      // Handle account creation failure
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleCreateAccount}>
        <div className="login-logo">
            <img src={kaizntreeLogo} alt="Kaizntree" />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={accountDetails.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={accountDetails.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={accountDetails.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">CREATE ACCOUNT</button>
      </form>
    </div>
  );
};

export default CreateAccount;
