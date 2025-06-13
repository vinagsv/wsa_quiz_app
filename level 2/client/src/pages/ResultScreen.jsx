import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCompletedQuizApi,
  fetchAttemptsApi,
} from "../store/thunks/resultThunk";
import { routes } from "../App";

const ResultScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, correctAnswers, incorrectAnswers, attempts, loading, error } =
    useSelector((state) => state.result);

  useEffect(() => {
    dispatch(fetchCompletedQuizApi());
    dispatch(fetchAttemptsApi());
  }, [dispatch]);

  const handleRestart = () => {
    navigate(routes.protectedRoutes.welcome);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Quiz Results</h2>
          <p className="text-center">
            You got {correctAnswers.length} out of{" "}
            {correctAnswers.length + incorrectAnswers.length} correct!
          </p>
          <p className="text-center">Attempts: {attempts}</p>
          <button onClick={handleRestart} className="btn btn-primary mt-6">
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
