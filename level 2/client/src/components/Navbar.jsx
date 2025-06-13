import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";
import { routes } from "../App";

const Navbar = ({ navigateButton }) => {
  const { isAuthenticated } = useAuthState();

  const targetPath = isAuthenticated
    ? navigateButton === "Logout"
      ? routes.protectedRoutes.logout
      : routes.protectedRoutes.welcome
    : navigateButton === "Signup"
    ? routes.signup
    : routes.login;

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link to={routes.home} className="btn btn-ghost text-xl">
          QUIZ App
        </Link>
      </div>
      <div className="flex-none">
        <Link to={targetPath} className="btn btn-primary px-4">
          {navigateButton}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
