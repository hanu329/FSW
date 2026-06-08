import React from 'react';
import './style/Headbar.css';

const Headbar = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="headbar">
      <div className="headbar-container">
        <div className="headbar-left">
          <div className="welcome-badge">
            <span className="badge-icon">🎉</span>
            <span className="badge-text">Welcome to ServiceHub</span>
          </div>
        </div>

        <div className="headbar-center">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search services, news, tasks..." 
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <div className="headbar-right">
          <div className="date-display">
            <span className="date-icon">📅</span>
            <span className="date-text">{currentDate}</span>
          </div>
          
          <div className="notifications">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headbar;