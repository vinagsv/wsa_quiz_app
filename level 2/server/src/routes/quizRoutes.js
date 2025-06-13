const express = require("express");
const authenticateUser = require("../middleware/userMiddleware");
const {
  submitQuiz,
  completedQuizQuestions,
} = require("../controllers/submitController");
const quizRouter = express.Router();

quizRouter.post("/submit", authenticateUser, submitQuiz);
quizRouter.get(
  "/completed-quiz-questions",
  authenticateUser,
  completedQuizQuestions
);

module.exports = quizRouter;
