import React, { useMemo } from "react";
import useQuestionContext from "../../hooks/useQuestionContext";
import clsx from "clsx";

export default function ProgressBar() {
  const { totalQuestions, activeQuestionNumber } = useQuestionContext();

  const isFinalQuestion = useMemo(
    () => activeQuestionNumber === totalQuestions,
    [activeQuestionNumber, totalQuestions]
  );

  const ProgressText = useMemo(
    () => `${((activeQuestionNumber / totalQuestions) * 100).toFixed(2)}%`,
    [activeQuestionNumber, totalQuestions]
  );
  return (
    <progress
      value={activeQuestionNumber}
      max={totalQuestions}
      className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
      {ProgressText}
    </progress>
  );
}
