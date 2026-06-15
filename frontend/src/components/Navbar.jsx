import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../config";
import { Local_URL } from "../config";
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser]= useState(null)
  const navigate = useNavigate();


useEffect(()=>{
let token = localStorage.getItem("token");
  if (token) {
    token = token.replace(/^"|"$/g, '').trim();
  }
  
  console.log("Cleaned token:", token);
  
  if (!token) {
    console.error("No valid token found");
    return;
  }

  axios.get(`${BASE_URL}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setUser(res.data))
  .catch(err => console.error("Error:", err.response?.data));

  console.log("user",user)
  
},[])
  
  console.log("user22",user)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Asynk</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/news" className="nav-link">News</Link>
          <Link to="/todo" className="nav-link">Todo</Link>
          <Link to="/expenses" className="nav-link">Expenses</Link>
          <Link to="/services" className="nav-link">Services</Link>
        </div>

        {/* User Section */}
        <div className="navbar-user">
          <div className="user-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
             <div className="user-avatar">
               <img  src={user?.avatar || "https://via.placeholder.com/150"}  width="150" alt={user?.name} />
            </div>
            
            <span className="user-name">Hello  {user?.name}</span> 
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">📄 Profile</Link>
              <Link to="/settings" className="dropdown-item">⚙️ Settings</Link>
              <Link to="/dashboard" className="dropdown-item">📊 Dashboard</Link>
              <hr className="dropdown-divider" />
              <button onClick={handleLogout} className="dropdown-item logout">🚪 Logout</button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>☰</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/news" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>News</Link>
          <Link to="/todo" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Todo</Link>
          <Link to="/expenses" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Expenses</Link>
          <Link to="/services" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <hr className="mobile-divider" />
          <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link to="/settings" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Settings</Link>
          <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;