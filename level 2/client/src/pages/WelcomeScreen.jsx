import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/thunks/authThunks";
import { resetQuestions } from "../store/slices/questionSlice";
import { routes } from "../App";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(resetQuestions()); // Reset quiz state before starting
    navigate(routes.protectedRoutes.questions);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(routes.home);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow justify-end px-4">
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow">
          <div className="card-body text-center">
            <h1 className="text-2xl font-bold text-primary">Let's Begin 🚀</h1>
            <p className="text-sm text-base-content/60">Are You Ready?</p>
            <p className="text-sm text-base-content/60 mb-4">
              Let’s see how many questions you can answer.
            </p>
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-success font-bold">✔</span> 30 Questions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success font-bold">✔</span> Pick 1 answer
              </li>
            </ul>
            <button onClick={handleStart} className="btn btn-primary mt-4">
              Start the Quiz
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
