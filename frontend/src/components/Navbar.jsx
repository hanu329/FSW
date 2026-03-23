import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 👈 NEW

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <div className="parent">
      <style>{`
        .parent {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          position: relative;
      
        }

        span {
          color: teal;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: teal;
          margin: 4px;
          transition: 0.3s;
        }

        /* Animation */
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            flex-direction: column;
            background: #f5f5f5;
            width: 200px;
            padding: 20px;
            transform: translateX(100%);
            transition: 0.3s ease-in-out;
          }

          .nav-links.open {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Left */}
      <div>
        <Link to="/news">
          <button>News</button>
        </Link>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Right Menu */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/">
          <span>Home</span>
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/signin">Login</Link>
          </>
        )}

        <span>About</span>
        <span>Contact Us</span>

        {isLoggedIn && (
          <span onClick={handleLogout}>Logout</span>
        )}
      </div>
    </div>
  );
}

export default Navbar;