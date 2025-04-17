import React, { useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import ProgressBar from "./ui/ProgressBar";
import Button from "./ui/Button";
import clsx from "clsx";
import Card from "./ui/Card";
import NextArrow from "../assets/chevron-left-rounded.svg";
import CorrectCheckMark from "../assets/white-checkmark.svg";
import IncorrectCross from "../assets/incorrect-cross.svg";

function NextArrowIcon() {
  return <img src={NextArrow} alt="Next Question" />;
}
export default function QuestionScreen({ showResultScreen }) {
  //track selected option
  const [userSelectedOption, setUserSelectedOption] = useState("");
  //static question data

  const activeQuestion = {
    _id: "question-1",
    question: "What is the capital of India?",
    options: [
      { id: "option-1", value: "Mumbai" },
      { id: "option-2", value: "Kolkatta" },
      { id: "option-3", value: "New Delhi" },
      { id: "option-4", value: "Bengaluru" },
    ],
    correctOptionId: "option-3",
  };

  const isAnswerCorrect = userSelectedOption === activeQuestion.correctOptionId;

  //if user has selected any option
  const hasAttempted = Boolean(userSelectedOption);
  return (
    <section className="question-section">
      <QuizLogo />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">1/5</div>

          <p className="question-text">{activeQuestion.question}</p>

          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption;
              const isOptionCorrect = isThisSelected && isAnswerCorrect;
              const isOptionIncorrect = isThisSelected && !isAnswerCorrect;
              return (
                <button
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    isThisSelected && "selected",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer"
                  )}
                  key={option.id}
                  onClick={() => setUserSelectedOption(option.id)}
                  disabled={hasAttempted}
                >
                  {option.value}
                  {isThisSelected ? (
                    <span
                      className={clsx(
                        isOptionCorrect && "correct-radio",
                        isOptionIncorrect && "incorrect-radio"
                      )}
                    >
                      {isOptionCorrect && (
                        <img src={CorrectCheckMark} alt="Correct-answer" />
                      )}
                      {isOptionIncorrect && (
                        <img src={IncorrectCross} alt="Correct-answer" />
                      )}
                    </span>
                  ) : (
                    <span className="unattempted-radio" />
                  )}
                </button>
              );
            })}
          </div>
          <Button
            disabled={!hasAttempted}
            icon={<NextArrowIcon />}
            iconPosition="right"
            size="small"
            onClick={showResultScreen}
          >
            Next
          </Button>
        </Card>
      </div>
    </section>
  );
}
