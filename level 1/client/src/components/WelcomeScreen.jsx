import React, { useCallback, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import QuestionBubble from "../assets/question-bubble.png";
import GreenCheckMark from "../assets/check-circle-green.svg";
import Card from "./ui/Card";
import Button from "./ui/Button";
import fetchQuestionAPI from "../api/fetchQuestions";
import handleError from "../utils/handleError";
import useQuestionContext from "../hooks/useQuestionContext";

export default function WelcomeScreen({ showQuestionScreen }) {
  const [loading, setLoading] = useState(false);
  const { processQuestions } = useQuestionContext();

  const handleResponse = useCallback(
    function (responseData) {
      processQuestions(responseData.questions);
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen]
  );

  const beginQuiz = useCallback(
    function () {
      fetchQuestionAPI(handleResponse, handleError, setLoading);
    },
    [handleResponse]
  );

  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="" width={172} />
          <h2>Are you ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            There are 30 Questions
          </li>
          <li className="list-item">
            <img src={GreenCheckMark} alt="" />
            You need to pick 1 answer
          </li>
        </ul>

        <Button
          size="large"
          onClick={beginQuiz}
          loadingText="Starting the quiz"
          loading={loading}
        >
          I'm Ready Start the Quiz
        </Button>
      </Card>
    </section>
  );
}
