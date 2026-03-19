import ExpData from "./ExpData";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (
    // border:"2px solid red"
    <div style={{margin:"0px", padding: "0px"}}>
      <Navbar />
     <Link to="/expdata">
                  previous expenses
                </Link>
                <button style={{margin:"10px"}}>
                   <Link to="/exp">
                  new expenses
                </Link>

                </button>
                
      <h1>Welcome</h1>
    </div>
  );
}
export default Home;