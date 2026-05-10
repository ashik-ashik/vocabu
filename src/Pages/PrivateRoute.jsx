// src/routes/PrivateRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/UseData";



const PrivateRoute = ({ children }) => {
  const { user, userIsLoading, userRole } = useAuth();
  const {payments, loading} = useData();
  const location = useLocation();

  // Show loading while checking auth
  if (userIsLoading || loading) {
    return <div className="min-h-full w-full flex items-center justify-center ">Loading...</div>;
  }

  // If user not logged in → redirect login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but not moderator → redirect home
  if (userRole !== "moderator" && userRole !== "admin" && payments?.Status?.toLowerCase() !== 'activated') {
    return <Navigate to="/" replace />;
  }
  
  

  // Allow access
  return children;
};

export default PrivateRoute;