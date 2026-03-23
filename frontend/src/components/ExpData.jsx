import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config";
import { Local_URL } from "../config";

const ExpData = () => {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {

      const token = localStorage.getItem("token");
   
      const res = await fetch(`${Local_URL}/api/expenses`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      setExpenses(data);

    } catch (error) {
      console.error(error);
    }
  };
  ////////
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

let todayTotal = 0;
let monthTotal = 0;
let overallTotal = 0;

expenses.forEach((exp) => {
  const expDate = new Date(exp.date);
  const expMonth = expDate.getMonth() + 1;
  const expYear = expDate.getFullYear();

  overallTotal += Number(exp.amount);

  if (exp.date === today) {
    todayTotal += Number(exp.amount);
  }

  if (expMonth === currentMonth && expYear === currentYear) {
    monthTotal += Number(exp.amount);
  }
});
////
const groupedExpenses = expenses
  .sort((a, b) => new Date(a.date) - new Date(b.date)) // sort by date
  .reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = [];
    }
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div>
         <style>{`
      th, td {
        margin-left: 30px;
        padding: 10px;
      }
        p{
        margin: 10px;
        color:teal
        }
        h2{
        font-size:25px;
        margin-left:5rem;
        color:red
        }
    `}</style>
      <h2> Expenses So Far!</h2>
<p>
  <b>This day:</b> {todayTotal} &nbsp; | &nbsp;
  <b>This month:</b> {monthTotal} &nbsp; | &nbsp;
  <b>Total till now:</b> {overallTotal}
</p>

<table border="1" cellPadding="10">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Time</th>
      <th>Location</th>
      <th>Shop</th>
    </tr>
  </thead>

  <tbody>
  {(() => {
    let weekTotal = 0;
    let prevWeek = null;

    return Object.entries(groupedExpenses).map(([date, exps], index, arr) => {
      const currentDate = new Date(date);

      // Week number logic (simple)
      const getWeek = (d) => {
        const firstDay = new Date(d.getFullYear(), 0, 1);
        const pastDays = Math.floor((d - firstDay) / 86400000);
        return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
      };

      const currentWeek = getWeek(currentDate);

      // Daily total
      const dailyTotal = exps.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      weekTotal += dailyTotal;

      let showWeekTotal = false;

      // Check next date's week
      if (index === arr.length - 1) {
        showWeekTotal = true; // last item
      } else {
        const nextDate = new Date(arr[index + 1][0]);
        const nextWeek = getWeek(nextDate);

        if (currentWeek !== nextWeek) {
          showWeekTotal = true;
        }
      }

      return (
        <React.Fragment key={date}>
          {/* Rows */}
          {exps.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.name}</td>
              <td>{exp.amount}</td>
              <td>{exp.date}</td>
              <td>{exp.hour}:{exp.minute} {exp.period}</td>
              <td>{exp.location}</td>
              <td>{exp.shop}</td>
            </tr>
          ))}

          {/* Daily Total */}
          <tr>
            <td colSpan="6" style={{ fontWeight: "bold", background: "grey" }}>
              <span style={{ marginLeft: "15rem" }}>
                Day Total : ₹{dailyTotal}
              </span>
            </td>
          </tr>

          {/* ✅ Week Total */}
          {showWeekTotal && (
            <tr>
              <td colSpan="6" style={{ fontWeight: "bold", background: "black", color: "white" }}>
                <span style={{ marginLeft: "15rem" }}>
                  Week Total : ₹{weekTotal}
                </span>
              </td>
            </tr>
          )}

          {/* Reset after printing */}
          {showWeekTotal && (weekTotal = 0)}
        </React.Fragment>
      );
    });
  })()}
</tbody></table>
<div>
   <button style={{margin:"10px"}}>
                   <Link to="/exp">
                 add new expenses
                </Link>
                </button>
</div>
    </div>
  );
};

export default ExpData;