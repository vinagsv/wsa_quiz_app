const express = require("express");
const {
  register,
  login,
  quizAttempts,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/userMiddleware");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/quiz-attempts", authenticateUser, quizAttempts);

module.exports = userRouter;
