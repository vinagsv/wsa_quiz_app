import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";
import { routes } from "../App";

const Home = () => {
  const { isAuthenticated, isTokenExpired } = useAuthState();

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar navigateButton={isAuthenticated ? "Logout" : "Signup"} />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Welcome to Quiz App
          </h1>
          <p className="text-lg text-base-content/70 max-w-md mx-auto">
            Test your knowledge with exciting quizzes. Ready to challenge
            yourself?
          </p>
          <Link
            to={
              isAuthenticated && !isTokenExpired
                ? routes.protectedRoutes.welcome
                : routes.login
            }
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
