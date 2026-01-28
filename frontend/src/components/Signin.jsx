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
<style>
  
{`
  .myinput::placeholder {
    font-size: 12px;
    color: #999;
  }
`}
</style>
  };

  return (
     <div style={{position:"absolute", left: "30%", top:"20%",
       border:"2px solid grey", 
       borderRadius:"1rem",
       padding:"2rem",
      boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;" 
    }}>
      <style>

  
{`


  .myinput::placeholder {
    font-size: 12px;
    color: #999;
  }
`}
</style>
    <form onSubmit={handleSubmit}>
      <h2 style={{
        //border:"3px solid teal", 
     
        paddingLeft:"3rem", 
      }}>--Login--</h2>
      <input placeholder="Email"  onChange={e=>setForm({...form, email:e.target.value}) } 
       class="myinput"
       style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}}/> <br />
      <input placeholder="Password"   class="myinput" type="password" onChange={e=>setForm({...form, password:e.target.value})}
       style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}} /><br />
      <button>Login</button>
    </form>

    </div>
  );
}

export default Login;


