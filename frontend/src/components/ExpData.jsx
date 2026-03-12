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

  return (
    <div>
      <h2>My Expenses</h2>

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