import React, { useCallback, useEffect, useMemo, useState } from "react";
import QuizLogo from "./ui/QuizLogo";
import ProgressBar from "./ui/ProgressBar";
import Button from "./ui/Button";
import clsx from "clsx";
import Card from "./ui/Card";
import NextArrow from "../assets/chevron-left-rounded.svg";
import CorrectCheckMark from "../assets/white-checkmark.svg";
import IncorrectCross from "../assets/incorrect-cross.svg";
import useQuestionContext from "../hooks/useQuestionContext";
import validateAnswerAPI from "../api/validateAnswer";
import handleError from "../utils/handleError";

// Component for Next Arrow icon
function NextArrowIcon() {
  return <img src={NextArrow} alt="Next Question" />;
}

export default function QuestionScreen({ showResultScreen }) {
  const [userSelectedOption, setUserSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    updateQuestionStatus,
    activeNextQuestion,
  } = useQuestionContext();

  const handleResponse = useCallback(
    (responseData) => {
      const isCorrectAnswer = responseData.status === 1;
      updateQuestionStatus(isCorrectAnswer);
    },
    [updateQuestionStatus]
  );

  const handleClick = useCallback(
    (selectedOption) => {
      setUserSelectedOption(selectedOption.id);

      validateAnswerAPI(
        activeQuestion._id,
        selectedOption.id,
        handleResponse,
        handleError,
        setLoading
      );
    },
    [activeQuestion._id, handleResponse]
  );

  useEffect(() => {
    setUserSelectedOption("");
  }, [activeQuestion._id]);

  const hasAttempted = Boolean(userSelectedOption);

  const isFinalQuestion = useMemo(() => {
    return activeQuestionNumber === totalQuestions;
  }, [activeQuestionNumber, totalQuestions]);

  return (
    <section className="question-section">
      <QuizLogo />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">
            {activeQuestionNumber}/{totalQuestions}
          </div>

          <p className="question-text">{activeQuestion.question}</p>

          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption;
              const isOptionCorrect =
                isThisSelected && activeQuestion.isAnswerCorrect;
              const isOptionIncorrect =
                isThisSelected && !activeQuestion.isAnswerCorrect;
              const showLoading = isThisSelected && loading;

              return (
                <button
                  key={activeQuestion._id + "-" + option.id}
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    showLoading && "loading",
                    isThisSelected && "selected",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer"
                  )}
                  onClick={() => handleClick(option)}
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
                        <img src={IncorrectCross} alt="Incorrect-answer" />
                      )}
                    </span>
                  ) : (
                    <span className="unattempted-radio" />
                  )}
                </button>
              );
            })}
          </div>

          {isFinalQuestion ? (
            <Button onClick={showResultScreen} disabled={!hasAttempted}>
              Submit
            </Button>
          ) : (
            <Button
              disabled={!hasAttempted}
              icon={<NextArrowIcon />}
              iconPosition="right"
              size="small"
              onClick={activeNextQuestion}
            >
              Next
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
}
