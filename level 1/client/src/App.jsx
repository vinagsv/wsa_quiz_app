import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import QuestionProvider from "./store/QuestionProvider";

export default function App() {
  const [viewScreen, setViewScreen] = useState("welcome");

  const showQuestionScreen = () => {
    setViewScreen("question");
  };

  const showResultScreen = () => {
    setViewScreen("result");
  };
  const restartQuiz = () => {
    setViewScreen("welcome");
  };
  return (
    <QuestionProvider>
      <div>
        {viewScreen === "welcome" && (
          <WelcomeScreen showQuestionScreen={showQuestionScreen} />
        )}
        {viewScreen === "question" && (
          <QuestionScreen showResultScreen={showResultScreen} />
        )}
        {viewScreen == "result" && <ResultScreen restartQuiz={restartQuiz} />}
      </div>
    </QuestionProvider>
  );
}
