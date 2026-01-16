import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Local_URL } from "../config";
import { useNavigate } from "react-router-dom";



//const API = import.meta.env.BASE_URL || Local_URL;


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
 const [error, setError] = useState("");

  const [image, setImage] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
      if (image) {
      // max 1MB
      if (image.size > 1024 * 1024) {
        setError("File size should not exceed 1MB");
        setImage(null);
        return;
      }}
    formData.append("image", image); // file

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
        navigate("/signin"); 
     // alert("Registered successfully!");
    } catch (err) {
      alert("Error registering");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
          maxLength={30}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        maxLength={50}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
         maxLength={20}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button>Register</button>
    </form>
  );
}

export default Register;