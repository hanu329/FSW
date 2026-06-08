import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";
//import { Local_URL } from "../config";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
   const [lgText, setlgText] = useState("sign in");
     const [showPassword, setShowPassword] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlgText("wait...")
    console.log('login1')


const res = await axios.post(
 `${BASE_URL}/api/auth/login`,
  form
);

console.log("is working", form, res)

localStorage.setItem("token", res.data.token);
navigate("/");

  };

  return (
    <div className="login-container">
      <div className="animated-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>
      
      <div className="login-card">
        <div className="card-header">
          <div className="logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
             value={form.email}
             onChange={e=>setForm({...form, email:e.target.value}) } 
              required
              placeholder="Email Address"
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
            value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}
              required
              placeholder="Password"
            />
            <button 
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {lgText}
          </button>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-icons">
              <button type="button" className="social-btn google">G</button>
              <button type="button" className="social-btn github">GH</button>
              <button type="button" className="social-btn twitter">T</button>
            </div>
          </div>

          <p className="signup-link">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login; 