import express from "express";
import questionController from "../controllers/questionController.js";

const { getQuestions, addAnswer } = questionController;

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.post("/validate-answer", addAnswer);

export default questionRouter;
