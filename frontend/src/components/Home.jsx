import ExpData from "./ExpData";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (
    // border:"2px solid red"
    <div style={{margin:"0px", padding: "0px"}}>
      <Navbar />
     {/* <Link to="/expdata">
                  previous expenses
                </Link>
                <span style={{margin:"10px"}}>
                   <Link to="/exp">
                  new expenses
                </Link>

                </span> */}
                  <div style={styles.container}>
                       <style>{`
                    .btnlft{
                    margin-left:3rem;
                    color:white
                
                    }
                    button{
                    color:white
                    }
                 
                    `}</style>
                      
                      {/* News Card */}
                      <div style={styles.card}>
                        <img
                          src="https://source.unsplash.com/200x200/?news"
                          alt="News"
                          style={styles.image}
                        />
                        <h3>News</h3>
                        <p>Stay updated with the latest headlines around the world.</p>
                        <button style={styles.button}>Explore</button>
                      </div>
                
                      {/* Expense Tracker Card */}
                      <div style={styles.card}>
                        <img
                          src="https://source.unsplash.com/200x200/?money"
                          alt="Expense"
                          style={styles.image}
                        />
                        <h3>Expense Tracker</h3>
                        <p>Track your daily spending and manage your budget easily.</p>
                        <Link to="/exp">
                        <button style={styles.button}>Add++</button> 
                        </Link>
                        <Link to="/expdata">
                        
                          <button style={styles.button} className="btnlft">Track</button>
                        </Link>
                        
                      </div>
                
                      {/* Todos Card */}
                      <div style={styles.card}>
                        <img
                          src="https://source.unsplash.com/200x200/?task"
                          alt="Todos"
                          style={styles.image}
                        />
                        <h3>Todos</h3>
                        <p>Create and manage your daily tasks efficiently.</p>
                        <button style={styles.button}>View Tasks</button>
                      </div>
                
                      {/* Services Card */}
                      <div style={styles.card}>
                        <img
                          src="https://source.unsplash.com/200x200/?services"
                          alt="Services"
                          style={styles.image}
                        />
                        <h3>Other Services</h3>
                        <p>Explore additional tools and features available.</p>
                        <button style={styles.button}>Check Now</button>
                      </div>
                
                    </div>
                    <Footer />
    
    </div>
  );
}


const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
   // background: "#fff",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  button: {
    marginTop: "7px",
    padding: "5px 8px",
    border: "none",
    borderRadius: "8px",
    background: "#007bff",
    //color: "#fff",
    cursor: "pointer",
  },
};


  


export default Home;