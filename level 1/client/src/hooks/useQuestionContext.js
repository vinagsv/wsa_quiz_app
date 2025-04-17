import { useContext } from "react";
import QuestionContext from "../store/QuestionContext";

export default function useQuestionContext() {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error(
      "useQuestionContext must be used within a QuestionProvider"
    );
  }

  return context;
}
