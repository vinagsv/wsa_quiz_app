import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCompletedQuizApi,
  fetchAttemptsApi,
} from "../store/thunks/resultThunk";
import { logoutUser } from "../store/thunks/authThunks";
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

  const score = correctAnswers.length;
  const totalQuestions = correctAnswers.length + incorrectAnswers.length;
  const quizzesPlayed = attempts;

  const getScorePercentage = () =>
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Combine correct and incorrect answers into userAnswers format
  const userAnswers = [
    ...correctAnswers.map((qa) => ({
      question: qa.question,
      selectedOption: qa.submitted_answer?.value || "No answer",
      correctAnswer: qa.answer?.value || "N/A",
    })),
    ...incorrectAnswers.map((qa) => ({
      question: qa.question,
      selectedOption: qa.submitted_answer?.value || "No answer",
      correctAnswer: qa.answer?.value || "N/A",
    })),
  ];

  const handleRestart = () => {
    navigate(routes.protectedRoutes.welcome);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(routes.home);
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

  if (!status && totalQuestions === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-error">No quiz results available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Quiz Results</h1>
        <div className="space-x-4">
          <button onClick={handleRestart} className="btn btn-error text-white">
            Restart
          </button>
          <button onClick={handleLogout} className="btn btn-error text-white">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Board */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Score Board
          </h2>
          <p className="text-center text-gray-400 mb-4">
            You have played <strong>{quizzesPlayed}</strong> quiz
          </p>
          <div className="flex justify-center">
            <div
              className="radial-progress text-success flex items-center justify-center text-center"
              style={{
                "--value": `${getScorePercentage()}`,
                "--size": "8rem",
                "--thickness": "10px",
              }}
              role="progressbar"
            >
              <div className="flex flex-col items-center justify-center leading-tight">
                <span className="text-3xl font-bold">{score}</span>
                <span className="text-sm text-gray-600">Your Score</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-6 flex-wrap gap-4">
            <div className="text-center">
              <p className="font-semibold text-info">100%</p>
              <p className="text-sm text-gray-500">Completion</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-success">{totalQuestions}</p>
              <p className="text-sm text-gray-500">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-success">
                {correctAnswers.length}
              </p>
              <p className="text-sm text-gray-500">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-error">
                {incorrectAnswers.length}
              </p>
              <p className="text-sm text-gray-500">Wrong Answers</p>
            </div>
          </div>
        </div>

        {/* Answers List */}
        <div className="card bg-base-100 shadow-xl p-6 overflow-y-auto max-h-[75vh]">
          <h2 className="text-xl font-semibold text-center mb-4">
            Your Answers
          </h2>
          {userAnswers.length === 0 ? (
            <p className="text-gray-500 text-center">No answers available.</p>
          ) : (
            userAnswers.map((qa, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-400 mb-1">
                  {String(index + 1).padStart(2, "0")}. {qa.question}
                </p>
                <p
                  className={`p-2 rounded mb-1 ${
                    qa.selectedOption === qa.correctAnswer
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <strong>Selected Answer:</strong> {qa.selectedOption}
                </p>
                {qa.selectedOption !== qa.correctAnswer && (
                  <p className="p-2 rounded bg-green-100 text-green-700">
                    <strong>Correct Answer:</strong> {qa.correctAnswer}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
