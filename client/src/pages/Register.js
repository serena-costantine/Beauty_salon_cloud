import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';


const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        name,
        password,
      });
      setMessage(res.data.message || 'User registered successfully');
      setEmail('');
      setName('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>

        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={inputStyle}
        />

        <label>Name (optional)</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />

        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="At least 6 characters"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Register</button>

        {message && <p className="message" style={{ marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
