const {
  QUIZ_STATUS_PENDING,
  QUIZ_STATUS_COMPLETED,
  UserQuiz: UserQuizModel,
  ANSWER_STATUS_RIGHT, // Added for checking status
  // ANSWER_STATUS_WRONG, // Not strictly needed if using else, but good for clarity
} = require("../models/userQuizModel");
const Question = require("../models/questionModel");
const User = require("../models/userModel");

const submitQuiz = async (req, res) => {
  try {
    // find current active quiz
    let userCurrentQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_PENDING,
    });

    if (!userCurrentQuiz) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No active quiz for the user to submit.",
        });
    }

    // Mark quiz as completed
    userCurrentQuiz.quiz_status = QUIZ_STATUS_COMPLETED;
    // Ensure results are up-to-date based on all answers
    await userCurrentQuiz.updateResult(); // This will also save the quiz with updated results and status

    // Increase the attempts count for the user
    // It's better to use $inc for atomic updates if possible, but this works.
    const user = await User.findById(req.user._id);
    if (user) {
      user.quiz_attempts = (user.quiz_attempts || 0) + 1;
      await user.save();
    } else {
      // Handle case where user is not found, though unlikely if req.user._id is valid
      console.error("User not found while trying to increment quiz attempts.");
    }

    // Prepare response data with detailed questions
    let incorrect_questions = [];
    let correct_questions = [];

    for (const userQuestion of userCurrentQuiz.questions) {
      if (!userQuestion.question_id) continue; // Skip if question_id is missing

      const questionModel = await Question.findById(
        userQuestion.question_id
      ).select("question options answer"); // Select only needed fields

      if (!questionModel) {
        console.warn(
          `Question with ID ${userQuestion.question_id} not found during quiz submission review.`
        );
        let _data = {
          question_id: userQuestion.question_id,
          question: "Question data not available",
          options: [],
          answer: null,
          attempted: userQuestion.attempted,
          answer_status: userQuestion.answer_status,
          submitted_answer: userQuestion.submitted_answer,
        };
        incorrect_questions.push(_data);
        continue;
      }

      let _data = {
        question_id: userQuestion.question_id,
        question: questionModel.question,
        options: questionModel.options,
        answer: questionModel.answer, // Correct answer
        attempted: userQuestion.attempted,
        answer_status: userQuestion.answer_status,
        submitted_answer: userQuestion.submitted_answer,
      };

      if (userQuestion.answer_status === ANSWER_STATUS_RIGHT) {
        correct_questions.push(_data);
      } else {
        incorrect_questions.push(_data);
      }
    }
    // userCurrentQuiz.save() is handled by updateResult() if it's the last save.
    // If other changes were made after updateResult, an explicit save would be needed here.
    // Since updateResult calls save, we are good.

    return res.status(200).send({
      // Changed to 200 for success
      success: true, // Use success consistently
      message: "Quiz submitted successfully.",
      result: userCurrentQuiz.result,
      incorrect_questions,
      correct_questions,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error.message); // Changed log message
    return res
      .status(500)
      .json({
        success: false,
        message: "Error submitting quiz: " + error.message,
      });
  }
};

const completedQuizQuestions = async (req, res) => {
  try {
    // Find all completed quizzes for the user, sorted by most recent
    let userCompletedQuizzes = await UserQuizModel.find({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_COMPLETED,
    }).sort({ updatedAt: -1 }); // Corrected: use updatedAt for timestamps, sort descending

    if (!userCompletedQuizzes || userCompletedQuizzes.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No completed quizzes found for the user.",
        });
    }

    // For this function, let's return details of the most recent one
    const latestQuiz = userCompletedQuizzes[0];

    let incorrect_questions = [];
    let correct_questions = [];

    for (const userQuestion of latestQuiz.questions) {
      if (!userQuestion.question_id) continue;

      const questionModel = await Question.findById(
        userQuestion.question_id
      ).select("question options answer");

      if (!questionModel) {
        console.warn(
          `Question with ID ${userQuestion.question_id} not found during completed quiz review.`
        );
        let _data = {
          question_id: userQuestion.question_id,
          question: "Question data not available",
          options: [],
          answer: null,
          attempted: userQuestion.attempted,
          answer_status: userQuestion.answer_status,
          submitted_answer: userQuestion.submitted_answer,
        };
        incorrect_questions.push(_data);
        continue;
      }

      let _data = {
        question_id: userQuestion.question_id,
        question: questionModel.question,
        options: questionModel.options,
        answer: questionModel.answer,
        attempted: userQuestion.attempted,
        answer_status: userQuestion.answer_status,
        submitted_answer: userQuestion.submitted_answer,
      };

      if (userQuestion.answer_status === ANSWER_STATUS_RIGHT) {
        correct_questions.push(_data);
      } else {
        incorrect_questions.push(_data);
      }
    }

    return res.status(200).send({
      // Changed to 200
      success: true, // Use success flag
      message: "Latest completed quiz details retrieved.",
      result: latestQuiz.result, // Corrected: use latestQuiz
      incorrect_questions,
      correct_questions,
      quizCompletedAt: latestQuiz.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching completed quiz questions:", error.message); // Changed log message
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching completed quiz results: " + error.message,
      });
  }
};

module.exports = { submitQuiz, completedQuizQuestions };
