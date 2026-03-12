import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
      // border: 2px solid teal;
    <div className="parent" >
       <style>{`
    .parent{

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
        }
    `}</style>
      <div>
             <Link to="/news">
          <button>News</button>
        </Link>
      </div>

   


      <div style={{ display: "flex", gap: "20px" }}>

        {!isLoggedIn && (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>

            <Link to="/signin">
              <button>Login</button>
            </Link>

            <Link to="/exp">
              <button>Expense</button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            

            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;