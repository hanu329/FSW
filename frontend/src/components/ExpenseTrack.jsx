import React, { useState} from "react";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { Local_URL } from "../config";

import '../style/addExpense.css';

const AddExpense = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to get current time in HH:MM
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
  const [form, setForm] = useState({
    details: "",
    amount: "",
   date: getTodayDate(),
  time: getCurrentTime(),
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("form", form)
  };
const handleSubmit = (e) => {
  e.preventDefault();
   console.log("form", form)
  saveExpenseToBackend(form); // Is this line present?
}

const saveExpenseToBackend = async (form) => {
  

  const token = localStorage.getItem("token");
  
  console.log("Function called with:", form); // Add this
  console.log("Token:", token); // Add this
  
  try {
    const response = await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form), // Fixed: form instead of expense
    });
    alert("added successfully")
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);
    console.log("hitting reactjs", token);
  } catch (error) {
    console.error("Error in saveExpenseToBackend:", error);
  }
};

0


  return (
    <div className="add-expense-container">
      <div className="animated-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <div className="add-expense-card">
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
          <h1>Add New Expense</h1>
          <p>Record your expense details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Details Input */}
          <div className="input-group">
            <label htmlFor="details" className="input-label">
              <span className="label-icon">📝</span>
              Details
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              placeholder="Enter expense details (e.g., Grocery shopping, Movie tickets...)"
              className="form-input"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Amount Input */}
          <div className="input-group">
            <label htmlFor="amount" className="input-label">
              <span className="label-icon">💰</span>
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="Enter amount (e.g., 49.99)"
              className="form-input"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Date Input */}
          <div className="input-group">
            <label htmlFor="date" className="input-label">
              <span className="label-icon">📅</span>
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="form-input"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Time Input */}
          <div className="input-group">
            <label htmlFor="time" className="input-label">
              <span className="label-icon">⏰</span>
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="form-input"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Location Input */}
          <div className="input-group">
            <label htmlFor="location" className="input-label">
              <span className="label-icon">📍</span>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Enter location (e.g., Walmart, Times Square...)"
              className="form-input"
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 15 20 9C20 4 16 2 12 2C8 2 4 4 4 9C4 15 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Summary Preview */}
          <div className="summary-preview">
            <h3>Expense Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>📝 Details:</span>
                <strong>{form.details || "Not provided"}</strong>
              </div>
              <div className="summary-item">
                <span>💰 Amount:</span>
                <strong>${form.amount || "0.00"}</strong>
              </div>
              <div className="summary-item">
                <span>📅 Date & Time:</span>
                <strong>{form.date || "YYYY-MM-DD"} {form.time || "--:--"}</strong>
              </div>
              <div className="summary-item">
                <span>📍 Location:</span>
                <strong>{form.location || "Not provided"}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/expenses")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <span>Add Expense</span>
                  <span className="btn-icon">+</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;