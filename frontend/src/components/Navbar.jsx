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
  span{
  color:teal
  
  }
 
    `}</style>
    
      <div>
             <Link to="/news">
          <button>News</button>
        </Link>
      </div>

   


      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">
          <span>Home</span>
        </Link>
      

        {!isLoggedIn && (
          <>
            <Link to="/register">
            Register
            </Link>

            <Link to="/signin">
             Login
            </Link>
{/*  <Link to="/exp">
              <button>Expense</button>
            </Link> */}
          </>
        )}
        <span>about</span>
        <span>contact us</span>

        {isLoggedIn && (
          <>
            <span onClick={handleLogout}>Logout</span>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;