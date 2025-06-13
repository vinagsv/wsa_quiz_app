import React, { useCallback, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import Trophy from "../assets/trophy.png";
import RestartIcon from "../assets/restart-icon.svg";
import Card from "./ui/Card";
import Button from "./ui/Button";
import useQuestionContext from "../hooks/useQuestionContext";
import handleError from "../utils/handleError";
import fetchQuestionAPI from "../api/fetchQuestions";

function RestartIconFC() {
  return <img src={RestartIcon} />;
}
export default function ResultScreen({ showQuestionScreen }) {
  const [loading, setLoading] = useState(false);
  const { correctAnswers, totalQuestions, processQuestions } =
    useQuestionContext();

  const handleResponse = useCallback(
    (responseData) => {
      processQuestions(responseData.questions);
      //Change screen
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen]
  );

  const beginQuiz = useCallback(
    function () {
      fetchQuestionAPI(handleResponse, handleError, setLoading);
    }[handleResponse]
  );

  let feedbackText = "YOU DID OK!";
  let percentage = (correctAnswers / totalQuestions) * 100;

  if (percentage >= 90) {
    feedbackText = "EXCELLENT JOB";
  } else if (percentage >= 70) {
    feedbackText = "GOOD JOB";
  } else if (percentage >= 50) {
    feedbackText = "YOU DID OK!";
  } else {
    feedbackText = "YOU COULD DO BETTER";
  }
  return (
    <section className="result-section">
      <QuizLogo size="large" />
      <Card className="result-card">
        <div className="result-icon-wrapper">
          <img src={Trophy} alt="" />
        </div>
        <h1 className="result-text">{feedbackText}</h1>
        <div className="result-details">
          <span className="correct-answer">{correctAnswers}</span>
          <p className="total-questions">
            Questions <br />
            out of <span className="weight-700">{totalQuestions}</span>
          </p>
        </div>
        <Button
          onClick={beginQuiz}
          loading={loading}
          loadingText="Restarting..."
          icon={<RestartIconFC />}
          iconPosition="right"
        >
          Restart
        </Button>
      </Card>
    </section>
  );
}
