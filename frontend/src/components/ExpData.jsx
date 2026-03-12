import React, { useEffect, useState } from "react";

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
   
      const res = await fetch(`${BASE_URL}/api/expenses`, {
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
        margin-left:10rem;
        color:yellow
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
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.name}</td>
              <td>{exp.amount}</td>
              <td>{exp.date}</td>
              <td>{exp.hour}:{exp.minute} {exp.period}</td>
              <td>{exp.location}</td>
              <td>{exp.shop}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ExpData;