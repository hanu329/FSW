import { useState } from "react";
import axios from "axios";
import { Local_URL } from "../config";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError("File size should not exceed 1MB");
        setImage(null);
        setImagePreview(null);
        return;
      }
      setError("");
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/signin");
    } catch (err) {
      setError("Error registering. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position:"absolute", left: "30%", top:"20%",
       border:"2px solid grey", 
       borderRadius:"1rem",
       padding:"2rem",
      boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;" 
    }}>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" >
      <div style={{
      //  border:"3px solid teal", 
     
        paddingLeft:"5rem", 
      }}>--Register--</div>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Register</h2> */}

        {error && (
          <p className="text-red-500 mb-2 text-sm text-center">{error}</p>
        )}

        <input
          placeholder="Name"
          maxLength={30}
          value={form.name}
          style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />  <br />

        <input
          placeholder="Email"
          maxLength={50}
          value={form.email}
           style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> <br />

        <input
          placeholder="Password"
          type="password"
          maxLength={20}
           style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
           style={{margin:"8px", border:"1px solid grey", borderRadius:"0.5rem",}}
          className="mb-3 w-full"
        /><br />

        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="Preview"
              height="200px"
              width="200px"
              //className="h-1 w-1 object-cover rounded-full mx-auto border"
            />
          </div>
        )}
<br />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-100 text-white p-3 rounded hover:bg-blue-100 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
   

</div>
  );
}

export default Register;
