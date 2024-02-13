import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import kaizntreeLogo from '../assets/kaizntreeLogo.png';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      localStorage.setItem('token', response.data.access);
      navigate('/item-dashboard');
    } catch (error) {
      console.error('Login failed:', error.response);
    }
  };

  const navigateToCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={kaizntreeLogo} alt="Kaizntree" />
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">LOG IN</button>
          <button type="button" className="create-account-btn" onClick={navigateToCreateAccount}>CREATE ACCOUNT</button>
          <a href="/forgot-password" className="forgot-password">Forgot Password</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
