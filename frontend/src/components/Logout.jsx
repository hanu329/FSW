import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // 🔥 remove token
    navigate("/signin");                // redirect to signin
  };

  return (
    
     <div>
      {!token ? (
        <button onClick={() => navigate("/signin")}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Logout;