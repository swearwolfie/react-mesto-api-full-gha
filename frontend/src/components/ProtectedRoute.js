import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

// const ProtectedRoute = ({ element: Component, ...props }) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
// )};

export default ProtectedRoute;
