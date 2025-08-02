import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaLockOpen
} from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!isLoginMode && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      if (isLoginMode) {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
          username,
          password
        });
        
        if (response.data.token) {
          onLogin(response.data.token);
        }
      } else {
        await axios.post(`${API_BASE_URL}/users`, {
          username,
          password
        });
        
        alert('Account created successfully! You can now sign in.');
        setIsLoginMode(true);
        resetForm();
      }
    } catch (error) {
      if (isLoginMode) {
        console.error('Login failed:', error);
        // Show the actual error message from the server
        const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
        alert(errorMessage);
      } else {
        const errorMessage = error.response?.data?.error || 'Username already exists or registration failed. Please try again.';
        alert(errorMessage);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </h1>
          <div className="auth-tabs">
            <button 
              className={`tab-button ${isLoginMode ? 'active' : ''}`}
              onClick={() => isLoginMode || switchMode()}
            >
              Sign In
            </button>
            <button 
              className={`tab-button ${!isLoginMode ? 'active' : ''}`}
              onClick={() => !isLoginMode || switchMode()}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <FaLockOpen />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="auth-button">
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
