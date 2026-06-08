// import React, { useState } from 'react';
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// import { BASE_URL } from "../config";

// //import { Local_URL } from "../config";
// import '../../stylesheet/demostyle.css'; 


// const ColorfulLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//  const [form, setForm] = useState({ email: "", password: "" });
//    const [lgText, setlgText] = useState("login");
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setlgText("wait...")
 


// const res = await axios.post(
//  `${BASE_URL}/api/auth/login`,
//   form
// );

// console.log("is working", form, res)

// localStorage.setItem("token", res.data.token);
// navigate("/");
//   }

//   return (
//     <div className="login-container">
//       <div className="animated-bg">
//         <div className="gradient-sphere sphere-1"></div>
//         <div className="gradient-sphere sphere-2"></div>
//         <div className="gradient-sphere sphere-3"></div>
//       </div>
      
//       <div className="login-card">
//         <div className="card-header">
//           <div className="logo">
//             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M2 17L12 22L22 17" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M2 12L12 17L22 12" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <defs>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#6366f1"/>
//                   <stop offset="100%" stopColor="#ec4899"/>
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//           <h1>Welcome Back</h1>
//           <p>Sign in to continue your journey</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={e=>setForm({...form, email:e.target.value})}
//               required
//               placeholder=" "
//             />
//             <label htmlFor="email">Email Address</label>
//             <div className="input-icon">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//           </div>

//           <div className="input-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//              onChange={e=>setForm({...form, email:e.target.value})}
//               required
//               placeholder=" "
//             />
//             <label htmlFor="password">Password</label>
//             <div className="input-icon password-icon" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? (
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.6566 6.06 6.06M9.9 4.24C10.5883 4.07887 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               ) : (
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               )}
//             </div>
//           </div>

//           <div className="form-options">
//             <label className="checkbox-label">
//               <input type="checkbox" />
//               <span>Remember me</span>
//             </label>
//             <a href="#" className="forgot-link">Forgot Password?</a>
//           </div>

//           <button type="submit" className="login-button" disabled={isLoading}>
//             {isLoading ? (
//               <div className="spinner"></div>
//             ) : (
//               'Sign In'
//             )}
//           </button>

//           <div className="social-login">
//             <p>Or continue with</p>
//             <div className="social-icons">
//               <button className="social-btn google">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{backgound:"red"}}>
//                   <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
//                   <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.69 16.7 5.84 14.09H2.18V16.93C4.01 20.58 7.77 23 12 23Z" fill="#34A853"/>
//                   <path d="M5.84 14.09C5.62 13.43 5.5 12.73 5.5 12C5.5 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05"/>
//                   <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.77 1 4.01 3.42 2.18 7.07L5.84 9.91C6.69 7.3 9.13 5.38 12 5.38Z" fill="#EA4335"/>
//                 </svg>
//               </button>
//               <button className="social-btn github">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.49C9.34 21.58 9.5 21.27 9.5 21C9.5 20.76 9.49 20.04 9.49 19.28C7.15 19.75 6.63 18.14 6.63 18.14C6.22 17.13 5.62 16.84 5.62 16.84C4.78 16.36 5.69 16.37 5.69 16.37C6.63 16.43 7.11 17.33 7.11 17.33C7.92 18.73 9.26 18.39 9.54 18.12C9.63 17.53 9.88 17.13 10.16 16.89C7.94 16.64 5.61 15.75 5.61 11.79C5.61 10.67 6 9.76 6.65 9.05C6.55 8.8 6.2 7.77 6.76 6.39C6.76 6.39 7.63 6.12 9.48 7.42C10.31 7.2 11.2 7.09 12.09 7.09C12.98 7.09 13.87 7.2 14.7 7.42C16.55 6.12 17.42 6.39 17.42 6.39C17.98 7.77 17.63 8.8 17.53 9.05C18.18 9.76 18.57 10.67 18.57 11.79C18.57 15.76 16.24 16.64 14.01 16.88C14.36 17.19 14.68 17.79 14.68 18.69C14.68 20 14.67 21.07 14.67 21.01C14.67 21.28 14.83 21.59 15.34 21.49C19.31 20.17 22.18 16.43 22.18 12.01C22.18 6.49 17.52 2 12 2Z" fill="currentColor"/>
//                 </svg>
//               </button>
//               <button className="social-btn twitter">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18586 6.93101 7.39545C5.36074 6.60503 4.01032 5.43886 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94364 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <p className="signup-link">
//             Don't have an account? <a href="#">Sign up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ColorfulLogin;