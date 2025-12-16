import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/services" className="logo">BeautySalon</Link>
      <nav className="nav-links">
        <Link to="/services">Services</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/book">Appointments</Link>
        <button className="logout-btn" onClick={handleLogout} title="Logout" aria-label="Logout">
          <FiLogOut size={22} color="#fff" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
