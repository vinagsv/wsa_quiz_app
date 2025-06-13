import QuestionContext from "../store/QuestionContext";
import React, { useState, useMemo, useCallback } from "react";

export default function QuestionProvider({ children }) {
  // State to store questions
  const [questions, setQuestions] = useState([]);

  // State to manage active Question Id
  const [activeQuestionId, setActiveQuestionID] = useState("");

  // Process questions data and initialize the state
  const processQuestions = useCallback(function (questionApiResponse) {
    setQuestions(
      questionApiResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false,
      }))
    );
    setActiveQuestionID(questionApiResponse[0]._id);
  }, []);

  // Active Question
  const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions]
  );

  // Calculate the active question number (1-based index)
  const activeQuestionNumber = useMemo(
    () =>
      questions.findIndex((question) => question._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  );

  // Total number of questions
  const totalQuestions = useMemo(() => questions.length, [questions]);

  // Update question status after an attempt
  const updateQuestionStatus = useCallback(
    (isAnswerCorrect) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question
        )
      );
    },
    [activeQuestionId]
  );

  // Move to the next question
  const activeNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (question) => question._id === activeQuestionId
    );

    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionID(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  // Count the number of correct answers
  const correctAnswers = useMemo(() => {
    const noOfCorrectAnswers = questions.filter(
      (question) => question.isAnswerCorrect
    ).length;
    return noOfCorrectAnswers;
  }, [questions]);

  // Context value for QuestionProvider
  const contextValue = useMemo(
    () => ({
      processQuestions,
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      updateQuestionStatus,
      activeNextQuestion,
      correctAnswers,
    }),
    [
      processQuestions,
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      updateQuestionStatus,
      activeNextQuestion,
      correctAnswers,
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
}
