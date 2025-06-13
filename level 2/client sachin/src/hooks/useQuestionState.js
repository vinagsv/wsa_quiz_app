import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitQuizAPI } from "../store/thunk/questionsThunk";

export const useQuestionState = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questionState = useSelector((state) => state.questions);
    const { questions, activeQuestionId, loading, isValidatingAnswer, isSubmittingQuiz, error } =
        questionState;

    // on page load or refresh, after fetching questoins, submit the quiz if all questions
    useEffect(() => {
        if (questions.length && !activeQuestionId && !error && !loading) {
            // in extrareducers  questions array is set empty after quiz has been submitted
            dispatch(submitQuizAPI());
        }
    }, [questions.length, loading, navigate, error, activeQuestionId]);

    // redirect to result if after quiz has been submitted
    useEffect(() => {
        if (!questions.length && !loading && !error && !isSubmittingQuiz) {
            // in extrareducers  questions array is set empty after quiz has been submitted
            navigate("/result");
        }
    }, [error, questions.length, loading, navigate, isSubmittingQuiz]);

    const activeQuestion = useMemo(
        () => questions.find((question) => question._id === activeQuestionId),
        [questions, activeQuestionId]
    );
    const activeQuestionNumber = useMemo(
        () => questions.findIndex((question) => question._id === activeQuestionId) + 1,
        [questions, activeQuestionId]
    );
    const totalQuestions = useMemo(() => questions.length, [questions.length]);

    const values = useMemo(
        () => ({
            activeQuestion,
            activeQuestionId,
            activeQuestionNumber,
            isValidatingAnswer,
            isSubmittingQuiz,
            loading,
            error,
            totalQuestions,
        }),
        [
            totalQuestions,
            activeQuestion,
            activeQuestionId,
            activeQuestionNumber,
            isValidatingAnswer,
            isSubmittingQuiz,
            loading,
            error,
        ]
    );

    return values;
};
