import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import '../style/expensesTable.css';

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  console.log("Before useEffect111");

  // Helper functions for default date and time
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Fetch expenses on component mount


useEffect(() => {

  fetchExpenses();
}, []);



  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    console.log("ch1")
    try {
      const response = await fetch(`${BASE_URL}/api/expenses`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      console.log("data1", data)
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch(`${BASE_URL}/api/expenses/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          setExpenses(expenses.filter(expense => expense.id !== id));
          alert("Expense deleted successfully!");
        } else {
          alert("Failed to delete expense");
        }
      } catch (err) {
        console.error("Error deleting expense:", err);
        alert("Error deleting expense");
      }
    }
  };

  // Filter expenses based on search and date
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? expense.date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  // Calculate total amount
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  return (
    <div className="expenses-table-container">
      <div className="animated-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <div className="expenses-content">
        {/* Header Section */}
        <div className="expenses-header">
          <div className="header-left">
            <h1 className="expenses-title">
              <span className="title-icon">📊</span>
              Expense Tracker
            </h1>
            <p className="expenses-subtitle">Manage and track all your expenses</p>
          </div>
          <Link to="/add-expense" className="add-expense-btn">
            <span className="btn-icon">+</span>
            Add New Expense
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card total-expenses">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Expenses</h3>
              <p className="stat-amount">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <div className="stat-card expense-count">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>Number of Transactions</h3>
              <p className="stat-amount">{filteredExpenses.length}</p>
            </div>
          </div>
          <div className="stat-card average-expense">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Average Expense</h3>
              <p className="stat-amount">
                ${filteredExpenses.length > 0 
                  ? (totalAmount / filteredExpenses.length).toFixed(2) 
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by details or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <span className="filter-icon">📅</span>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="filter-input"
            />
            {filterDate && (
              <button className="clear-filter" onClick={() => setFilterDate("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Expenses Table */}
        <div className="table-wrapper">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading expenses...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <button onClick={fetchExpenses} className="retry-btn">Retry</button>
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <h3>No expenses found</h3>
              <p>{searchTerm || filterDate ? "Try adjusting your search filters" : "Start by adding your first expense"}</p>
              <Link to="/add-expense" className="empty-add-btn">
                + Add Your First Expense
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>📝 Details</th>
                    <th>💰 Amount</th>
                    <th>📅 Date</th>
                    <th>⏰ Time</th>
                    <th>📍 Location</th>
                    <th>⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id || index} className="table-row">
                      <td>
                        <div className="details-content">
                          <span className="detail-text">{expense.details || "N/A"}</span>
                        </div>
                      </td>
                      <td className="amount-cell">
                        <span className="amount-badge">
                          ${expense.amount ? parseFloat(expense.amount).toFixed(2) : "0.00"}
                        </span>
                      </td>
                      <td className="date-cell">
                        <span className="date-badge">
                          📅 {expense.date || getTodayDate()}
                        </span>
                      </td>
                      <td className="time-cell">
                        <span className="time-badge">
                          ⏰ {expense.time || getCurrentTime()}
                        </span>
                      </td>
                      <td className="location-cell">
                        <span className="location-badge">
                          📍 {expense.location || "N/A"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => navigate(`/edit-expense/${expense.id}`)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(expense.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {filteredExpenses.length > 0 && !isLoading && (
          <div className="table-footer">
            <div className="footer-info">
              <span>Showing {filteredExpenses.length} of {expenses.length} transactions</span>
            </div>
            <div className="footer-total">
              <span>Total Amount:</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesTable;