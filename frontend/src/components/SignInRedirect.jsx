// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const SignInRedirect = ({ children }) => {
  const token = localStorage.getItem("token"); // or wherever you store JWT
  console.log("token",token)

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default SignInRedirect;