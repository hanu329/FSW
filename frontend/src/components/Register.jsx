import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import '../style/register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: null
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
   const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError("File size should not exceed 1MB");
        setImage(null);
        setImagePreview(null);
        return;
      }
      setError("");
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/signin");
    } catch (err) {
      setError("Error registering. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="animated-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <div className="register-card">
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
          <h1>Create Account</h1>
          <p>Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <div className="input-icon password-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.6566 6.06 6.06M9.9 4.24C10.5883 4.07887 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="input-group photo-group">
            <label htmlFor="photo" className="photo-label">
              <div className="photo-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="photo-preview-img" />
                ) : (
                  <div className="photo-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Upload Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="social-login">
            <p>Or sign up with</p>
            <div className="social-icons">
              <button type="button" className="social-btn google">G</button>
              <button type="button" className="social-btn github">GH</button>
              <button type="button" className="social-btn twitter">T</button>
            </div>
          </div>

          <p className="login-link">
            Already have an account? <Link to="/signin ">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;