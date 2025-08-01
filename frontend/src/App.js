import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import ItemsList from './components/ItemsList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

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
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ItemsList token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
