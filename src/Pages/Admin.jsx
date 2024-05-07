//Admin.jsx
import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Signup
      if (username && password) {
        setUsers([...users, { username, password }]);
        setUsername('');
        setPassword('');
        setIsSignUp(false);
        alert('Signed up successfully! Please login.');
      } else {
        alert('Please enter username and password!');
      }
    } else {
      // Login
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        setIsLoggedIn(true);
        alert('Logged in successfully!');
      } else {
        alert('Invalid username or password!');
      }
    }
  };

  return (
    <div className="admin-panel">
      {isLoggedIn ? (
        <div>Welcome to Admin Panel</div>
      ) : (
        <div>
          <h2>{isSignUp ? 'Sign Up for Admin Panel' : 'Login to Admin Panel'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
          </form>
          <p>
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <button onClick={handleToggleForm}>
              {isSignUp ? 'Login here' : 'Sign up here'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;