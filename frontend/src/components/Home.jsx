import {  Link } from "react-router-dom";


 function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome</h1>
      <p>Please choose an option:</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Link to="/register">
          <button>Register</button>
        </Link>

        <Link to="/signin">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;