import { useState } from "react";
import axios from "axios";



function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
    alert(res.data.message);
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
