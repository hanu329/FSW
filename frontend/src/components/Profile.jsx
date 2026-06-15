import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { Local_URL } from "../config";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseTrack";



function Profile() {
  const [user, setUser] = useState(null);




useEffect(() => {
  let token = localStorage.getItem("token");
  if (token) {
    token = token.replace(/^"|"$/g, '').trim();
  }
  
  console.log("Cleaned token:", token);
  
  if (!token) {
    console.error("No valid token found");
    return;
  }

  axios.get(`${BASE_URL}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setUser(res.data))
  .catch(err => console.error("Error:", err.response?.data));
}, []);

  if (!user) return <p>Loading...</p>;
  console.log("user ", user)

  return (
   <div>
     <Navbar  />
     <div style={{margin:"20px"}}></div>

     <Link to="/exp">
              <button>Expense</button>
            </Link>
       <div style={{margin:"20px"}}></div>
  <img  src={user.avatar || "https://via.placeholder.com/150"}  width="150" alt={user.name} />
  <p>Name: {user.name}</p>
  <p>Email: {user.email}</p>
</div>

  );
}

export default Profile;
