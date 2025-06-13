import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";
import { routes } from "../App";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? element : <Navigate to={routes.login} />;
};

export default ProtectedRoute;
