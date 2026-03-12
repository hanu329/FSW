import ExpData from "./ExpData";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
     <Link to="/expdata">
                  previous expenses
                </Link>
      <h1>Welcome</h1>
    </div>
  );
}
export default Home;