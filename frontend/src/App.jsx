import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Home from "./components/Home";

function App() {
  return (
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
