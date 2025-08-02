import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaShoppingCart, 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaTimes, 
  FaCheck,
  FaLockOpen
} from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLoginMode && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (isLoginMode) {
        const response = await axios.post('http://localhost:8080/users/login', {
          username,
          password
        });
        
        if (response.data.token) {
          onLogin(response.data.token);
        }
      } else {
        await axios.post('http://localhost:8080/users', {
          username,
          password
        });
        
        setSuccess('Account created successfully! You can now sign in.');
        setIsLoginMode(true);
        resetForm();
      }
    } catch (error) {
      if (isLoginMode) {
        console.error('Login failed:', error);
        setError('Invalid username or password. Please try again.');
      } else {
        setError('Username already exists or registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <div className="logo-icon">
                <FaShoppingCart/>
              </div>
              <h1>Kartify</h1>
            </div>
            <p className="welcome-text">
              {isLoginMode 
                ? "Welcome back! Sign in to your account" 
                : "Create your account to get started"
              }
            </p>
          </div>

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
            {error && (
              <div className="message error-message">
                <span className="message-icon">
                  <FaTimes />
                </span>
                {error}
              </div>
            )}

            {success && (
              <div className="message success-message">
                <span className="message-icon">
                  <FaCheck />
                </span>
                {success}
              </div>
            )}

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
                  className={error && !username ? 'error' : ''}
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
                  className={error && !password ? 'error' : ''}
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
                    className={error && !confirmPassword ? 'error' : ''}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {isLoginMode ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLoginMode ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
