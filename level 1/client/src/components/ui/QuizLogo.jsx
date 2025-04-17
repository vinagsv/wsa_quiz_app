import React from "react";
import Logo from "../../assets/quiz-logo.svg";

const allSizes = {
  small: 168, //values are in pixel
  large: 306,
};

export default function QuizLogo({ size = "small" }) {
  return <img src={Logo} alt="Quiz Logo" wodth={allSizes[size]} />;
}
