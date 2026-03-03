import React, { useState } from "react";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  let [flag, setFlag] = useState(0)

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


  const saveExpenseToBackend = async (expense) => {
    setFlag(1)
  const token = localStorage.getItem("token");


  await fetch("http://localhost:5000/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  console.log("hitting reactjs", token)
};

return (
  <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
    <button
      onClick={addExpenseField}
      style={{
        padding: "10px 16px",
        fontSize: "16px",
        marginBottom: "20px",
        cursor: "pointer",
      }}
    >
      Add Expense
    </button>

    {expenses.map((expense, index) => (
      <div
        key={index}
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {/* Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={expense.name}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ padding: "8px" }}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ padding: "8px" }}
          />

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ padding: "8px" }}
          />

          <select
            name="hour"
            value={expense.hour}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{
              backgroundColor: "#333333",
              color: "#ffffff",
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
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
              backgroundColor: "#333333",
              color: "#ffffff",
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
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
            style={{ padding: "8px" }}
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
            style={{ padding: "8px" }}
          />

          <input
            type="text"
            name="shop"
            placeholder="Shop Name"
            value={expense.shop}
            onChange={(e) => handleChange(index, e)}
            disabled={!expense.isEditing}
            style={{ padding: "8px" }}
          />
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={() => handleAddClick(index)}
            style={{
              backgroundColor: expense.added ? "green" : "",
              color: expense.added ? "white" : "",
              padding: "8px 14px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {expense.added ? "Added" : "Add"}
          </button>

          <span
            onClick={() => handleEdit(index)}
            style={{ cursor: "pointer", marginRight: "15px", fontSize: "18px" }}
          >
            ✏️
          </span>

          <span
            onClick={() => handleDelete(index)}
            style={{ cursor: "pointer", fontSize: "18px" }}
          >
            🗑️
          </span>
        </div>
      </div>
    ))}

    <h3 style={{ marginTop: "30px" }}>
      Total Amount: ₹ {totalAmount}
    </h3>

     <button
            onClick={() => saveExpenseToBackend(expenses)}
            style={{
              backgroundColor: flag==1? "green" : "",
              color: flag==1 ? "white" : "",
              padding: "8px 14px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            {flag==1 ? "Saved" : "Save"}
          </button>


  </div>
);
}

export default ExpenseForm;