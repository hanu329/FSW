import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
