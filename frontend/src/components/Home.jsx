import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Headbar from './Headbar';

const Home = () => {
  const navigate = useNavigate();



// Then in your JSX return:


  const services = [
    {
      id: 1,
      title: "News Feed",
      description: "Stay updated with latest news, trends, and updates from around the world",
      icon: "📰",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      path: "/news",
      color: "#667eea"
    },
    {
      id: 2,
      title: "Todo List",
      description: "Organize your tasks, set priorities, and boost your productivity",
      icon: "✅",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      path: "/todo",
      color: "#f5576c"
    },
    {
      id: 3,
      title: "Expense Tracker",
      description: "Track your spending, manage budget, and achieve financial goals",
      icon: "💰",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      path: "/expdata",
      color: "#4facfe"
    },
    {
      id: 4,
      title: "Post Ur Mind",
      description: "Explore more features including weather, notes, calculator & more",
      icon: "🎨",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      path: "/services",
      color: "#43e97b"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  
  return (
    <div className="home-container">
  
      <Navbar />
      
      <div className="animated-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <div className="home-content">
        {/* Header Section */}
        <div className="welcome-section">
          <div className="user-greeting">
            <div className="greeting-icon">👋</div>
            <div>
              <h1 className="welcome-title">Welcome Back!</h1>
              <p className="welcome-subtitle">Great to see you again. What would you like to do today?</p>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📌</div>
              <div className="stat-info">
                <h3>5</h3>
                <p>Pending Tasks</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>$1,250</h3>
                <p>This Month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📰</div>
              <div className="stat-info">
                <h3>15</h3>
                <p>New Articles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-section">
          <h2 className="section-title">
            <span className="title-gradient">Your Services</span>
          </h2>
          <div className="cards-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => handleCardClick(service.path)}
                style={{ '--card-color': service.color }}
              >
                <div className="card-glow"></div>
                <div className="card-icon">{service.icon}</div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                <button 
                  className="card-button"
                  style={{ background: service.gradient }}
                >
                 Explore →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">
            <span className="title-gradient">Quick Actions</span>
          </h2>
          <div className="actions-grid">
            <div className="action-item" onClick={() => navigate("/todo")}>
              <div className="action-icon">➕</div>
              <span>Add Task</span>
            </div>
            <div className="action-item" onClick={() => navigate("/exp")}>
              <div className="action-icon">💵</div>
              <span>Add Expense</span>
            </div>
            <div className="action-item" onClick={() => navigate("/news")}>
              <div className="action-icon">📊</div>
              <span>Trending News</span>
            </div>
            <div className="action-item" onClick={() => navigate("/services")}>
              <div className="action-icon">⚙️</div>
              <span>More Tools</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;