// src/routes/PrivateRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";



const PrivateRoute = ({ children }) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return <div className="min-h-full w-full flex items-center justify-center ">Loading...</div>;
  }

  // If user not logged in → redirect login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // If logged in but not admin → redirect home

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default PrivateRoute;