import React, { useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import Trophy from "../assets/trophy.png";
import RestartIcon from "../assets/restart-icon.svg";
import Card from "./ui/Card";
import Button from "./ui/Button";

function RestartIconFC() {
  return <img src={RestartIcon} />;
}
export default function ResultScreen({ restartQuiz }) {
  const [loading, setLoading] = useState(false);

  //Hardcode values
  const totalQuestions = 10;
  const correctAnswers = 7;

  let percentage = (correctAnswers / totalQuestions) * 100;
  let feedbackText = "YOU DID OK!";

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
          onClick={() => {
            setLoading(true);
            restartQuiz();
          }}
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
