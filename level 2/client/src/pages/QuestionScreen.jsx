import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuestionState } from "../hooks/useQuestionState";
import {
  validateAnswerApi,
  fetchQuestionsApi,
  submitQuizApi,
} from "../store/thunks/questionThunk";
import { activeNextQuestion } from "../store/slices/questionSlice";
import { routes } from "../App";
import { logoutUser } from "../store/thunks/authThunks";
import { toast } from "react-toastify";

const QuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    isValidatingAnswer,
    loading,
    error,
  } = useQuestionState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestionsApi());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(routes.login);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      dispatch(
        validateAnswerApi({
          questionId: activeQuestion._id,
          answer: { id: selectedOption.id, value: selectedOption.value },
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          const isCorrect = result.payload.status === 1;
          // Show toast for correct/incorrect answer
          toast[isCorrect ? "success" : "error"](
            isCorrect ? "Correct answer!" : "Incorrect answer!"
          );
          setAnswerFeedback({
            isCorrect,
            message: isCorrect ? "Correct!" : "Incorrect!",
            correctAnswer: result.payload.correct_answer?.value,
          });
          setTimeout(() => {
            // Check if this is the last question
            if (activeQuestionNumber === totalQuestions) {
              dispatch(submitQuizApi()).then((submitResult) => {
                if (submitResult.meta.requestStatus === "fulfilled") {
                  navigate(routes.protectedRoutes.result);
                } else {
                  toast.error("Failed to submit quiz");
                }
              });
            } else {
              dispatch(activeNextQuestion());
            }
            setSelectedOption(null);
            setAnswerFeedback(null);
          }, 1000);
        } else {
          toast.error(result.payload || "Failed to validate answer");
        }
      });
    }
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

  if (!activeQuestion) {
    // Instead of returning null, navigate to results if all questions are answered
    if (totalQuestions > 0 && activeQuestionNumber > totalQuestions) {
      dispatch(submitQuizApi()).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate(routes.protectedRoutes.result);
        }
      });
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="navbar bg-base-100 shadow px-8">
        <div className="flex-1">
          <span className="text-2xl font-bold text-primary">Quiz</span>
        </div>
        <div className="flex-none">
          <button onClick={handleLogout} className="btn btn-error text-white">
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl mb-6">
          <progress
            className="progress progress-primary w-full"
            value={(activeQuestionNumber / totalQuestions) * 100}
            max="100"
          ></progress>
        </div>
        <div className="card bg-base-100 shadow-xl w-full max-w-xl">
          <div className="card-body">
            <div className="flex justify-center mb-4">
              <div className="badge badge-primary p-4 text-white text-lg font-bold">
                {activeQuestionNumber}/{totalQuestions}
              </div>
            </div>
            <h2 className="text-center text-lg font-semibold mb-6">
              {activeQuestion.text}
            </h2>
            {answerFeedback && (
              <div
                className={`text-center mb-4 ${
                  answerFeedback.isCorrect ? "text-success" : "text-error"
                }`}
              >
                <p className="font-bold">{answerFeedback.message}</p>
                {!answerFeedback.isCorrect && (
                  <p>Correct answer: {answerFeedback.correctAnswer}</p>
                )}
              </div>
            )}
            <div className="space-y-4">
              {activeQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between border rounded px-4 py-3 cursor-pointer ${
                    selectedOption?.id === option.id
                      ? "border-primary bg-primary/10"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <span className="text-base text-base-content">
                    {option.value}
                  </span>
                  <input
                    type="radio"
                    className="radio radio-primary"
                    checked={selectedOption?.id === option.id}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className="card-actions justify-center mt-6">
              <button
                onClick={handleNext}
                disabled={!selectedOption || isValidatingAnswer}
                className={`btn ${
                  selectedOption && !isValidatingAnswer
                    ? "btn-primary"
                    : "btn-disabled"
                } px-8`}
              >
                {isValidatingAnswer
                  ? "Submitting..."
                  : activeQuestionNumber === totalQuestions
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionScreen;
