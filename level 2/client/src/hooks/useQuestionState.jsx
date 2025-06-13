import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../App";
import { submitQuizApi } from "../store/thunks/questionThunk";

export const useQuestionState = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionState = useSelector((state) => state.questions);

  const {
    questions,
    activeQuestionId,
    loading,
    isValidatingAnswer,
    isSubmittingQuiz,
    error,
  } = questionState;

  const questionsLength = questions.length;

  useEffect(() => {
    if (questionsLength && !activeQuestionId && !loading && !error) {
      dispatch(submitQuizApi());
    }
  }, [activeQuestionId, questionsLength, loading, error, dispatch]);

  useEffect(() => {
    if (!questionsLength && !loading && !error && !isSubmittingQuiz) {
      navigate(routes.protectedRoutes.result);
    }
  }, [questionsLength, loading, error, isSubmittingQuiz, navigate]);

  const activeQuestion = useMemo(
    () => questions.find((q) => q._id === activeQuestionId),
    [activeQuestionId, questions]
  );

  const activeQuestionNumber = useMemo(
    () => questions.findIndex((q) => q._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  );

  const totalQuestions = useMemo(() => questionsLength, [questionsLength]);

  return {
    activeQuestion,
    activeQuestionId,
    activeQuestionNumber,
    totalQuestions,
    isValidatingAnswer,
    isSubmittingQuiz,
    loading,
    error,
  };
};
