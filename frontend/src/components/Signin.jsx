import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";
import { Local_URL } from "../config";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await axios.post(`${Local_URL}/api/auth/login`, form);
    // console.log("tokendata: ", res.data.token);
    // localStorage.setItem("token", res.data.token);
    // navigate("/profile");
    // alert(res.data.message);


//     const res1 = await axios.post(
//   "http://localhost:5000/api/auth/login",
//   form
// );
const res = await axios.post(
 `${BASE_URL}/api/auth/login`,
  form
);

localStorage.setItem("token", res.data.token);
navigate("/profile");

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" onChange={e=>setForm({...form, password:e.target.value})} />
      <button>Login</button>
    </form>
  );
}

export default Login;
