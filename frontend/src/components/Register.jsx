import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Local_URL } from "../config";


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("image", image); // file

    try {
      await axios.post(`${Local_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registered successfully!");
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
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
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
