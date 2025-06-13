import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthState } from "../hooks/useAuthState";
import { logoutUser } from "../store/thunks/authThunks";
import { routes } from "../App";

const Logout = () => {
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logoutUser());
    }
    setRedirecting(true);
    const timeoutId = setTimeout(() => {
      navigate(routes.home, { replace: true });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center">
      <h1 className="text-3xl font-bold mb-4">Logging out...</h1>
      {redirecting && (
        <p className="text-base-content/70">
          You will be redirected to the home page in 5 seconds.
        </p>
      )}
    </div>
  );
};

export default Logout;
