import QuestionContext from "../store/QuestionContext";
import React, { useState, useMemo, useCallback } from "react";

export default function QuestionProvider({ children }) {
  // state to store questions
  const [questions, setQuestions] = useState([]);

  // state to manage active Question Id
  const [activeQuestionId, setActiveQuestionID] = useState("");

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
  const activeQuestionNumber = useMemo(() => {
    questions.findIndex((question) => question._id === activeQuestionId);
  }, [activeQuestionId, questions]);

  const contextValue = useMemo(
    () => ({
      processQuestions,
      activeQuestion,
      activeQuestionNumber,
    }),
    [processQuestions, activeQuestion, activeQuestionNumber]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
}
