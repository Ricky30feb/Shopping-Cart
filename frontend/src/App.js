import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ItemsList from './components/ItemsList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userToken) => {
    setToken(userToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', userToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <ItemsList token={token} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
