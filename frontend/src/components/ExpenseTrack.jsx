import React, { useState } from "react";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpenseField = () => {
    setExpenses([
      ...expenses,
      {
        name: "",
        amount: "",
        date: "",
        hour: "01",
        minute: "00",
        period: "AM",
        location: "",
        shop: "",
        added: false,
        isEditing: true,
      },
    ]);
  };

  const handleChange = (index, event) => {
    const values = [...expenses];
    values[index][event.target.name] = event.target.value;
    setExpenses(values);
  };

  const handleAddClick = (index) => {
    const values = [...expenses];
    values[index].added = true;
    values[index].isEditing = false;
    setExpenses(values);
  };

  const handleEdit = (index) => {
    const values = [...expenses];
    values[index].isEditing = true;
    values[index].added = false;
    setExpenses(values);
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + (Number(expense.amount) || 0);
  }, 0);

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={addExpenseField}>Add Expense</button>

      {expenses.map((expense, index) => (
        <div
          key={index}
          style={{
            marginTop: "25px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={expense.name}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          {/* 12 Hour Time Picker */}
         <select
  name="hour"
  value={expense.hour}
  onChange={(e) => handleChange(index, e)}
  disabled={!expense.isEditing}
 style={{
    marginRight: "5px",
    marginBottom: "10px",
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #ccc",
    padding: "5px",
    borderRadius: "4px"
  }}

>
  {hours.map((h) => (
    <option key={h} value={h}>
      {h}
    </option>
  ))}
</select>

<select
  name="minute"
  value={expense.minute}
  onChange={(e) => handleChange(index, e)}
  
  disabled={!expense.isEditing}
   style={{
    marginRight: "5px",
    marginBottom: "10px",
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #ccc",
    padding: "5px",
    borderRadius: "4px"
  }}
>
  {minutes.map((m) => (
    <option key={m} value={m}>
      {m}
    </option>
  ))}
</select>
          <select
            name="period"
            value={expense.period}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginRight: "20px", marginBottom: "10px" }} // extra gap added
          >
            <option>AM</option>
            <option>PM</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={expense.location}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <input
            type="text"
            name="shop"
            placeholder="Shop Name"
            value={expense.shop}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ marginBottom: "10px" }}
          />

          <br />

          <button
            onClick={() => handleAddClick(index)}
            style={{
              backgroundColor: expense.added ? "green" : "",
              color: expense.added ? "white" : "",
              marginRight: "10px",
            }}
          >
            {expense.added ? "Added" : "Add"}
          </button>

          <span
            onClick={() => handleEdit(index)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            ✏️
          </span>

          <span
            onClick={() => handleDelete(index)}
            style={{ cursor: "pointer" }}
          >
            🗑️
          </span>
        </div>
      ))}

      <h3 style={{ marginTop: "25px" }}>
        Total Amount: ₹ {totalAmount}
      </h3>
    </div>
  );
};

export default ExpenseForm;