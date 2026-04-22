import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './style/navbar.css';

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
     
      <style></style>

      {/* Left */}
      <div>
        <Link to="/news">
          <button>Async</button>
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