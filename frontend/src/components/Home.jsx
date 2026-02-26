import {  Link } from "react-router-dom";


 function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      {/* <p>Please choose an option:</p> */}

      <div style={{ display: "flex", gap: "20px", justifyContent: "center",textAlign: "center", marginTop: "100px"  }}>
        <Link to="/register">
          <button>Register</button>
        </Link>

        <Link to="/signin">
          <button>Login</button> <br />
        </Link>
        <Link to="/exp">
          <button>Expense</button>
        </Link>
        
         <Link to="/news">
          <button>News</button>
        </Link>
    
        {/* <Link to="/payment">
          <button>Pay Now</button>
        </Link>
        <Link to="/ai">
          <button>Ai agent here</button>
        </Link> */}
      </div>
    </div>
  );
}

export default Home;