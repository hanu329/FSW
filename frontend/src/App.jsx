import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Demo from "./components/Demo";
import PaymentButton from "./components/PaymentButton";
import NewsComponent from "./components/NewsComponent";
import { AiTool } from "./components/AiTool";

function App() {
  return (
    <div className="text-red-500 text-3xl font-bold">
 

       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      
        <Route path="/news" element={<NewsComponent />} />
          <Route path="/ai" element={<AiTool />} />
         <Route path="/payment" element={<PaymentButton />} />
         <Route path="/d" element={<Demo />} />
    </Routes>
    </div>
  );
}

export default App;
////Atoughpassd@329  razor login
///rFS'Zb8-E)^3),d huggingface
