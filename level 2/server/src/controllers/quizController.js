const {
  UserQuiz: UserQuizModel,
  QUIZ_STATUS_COMPLETED,
  ANSWER_STATUS_RIGHT, // Import for checking answer status
} = require("../models/userQuizModel");
const Question = require("../models/questionModel");

const getCompletedQuiz = async (req, res) => {
  try {
    // find the most recently completed quiz for the user
    // If you need all, use find() and then map, or provide pagination.
    // For this example, let's get the latest one.
    let latestCompletedQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_COMPLETED,
    }).sort({ updatedAt: -1 }); // Sort by when it was last updated (completed)

    if (!latestCompletedQuiz) {
      return res
        .status(404)
        .json({ success: false, message: "No completed quiz found" });
    }

    // To avoid N+1 queries, you could populate question details here if needed,
    // or adjust how questions are stored in UserQuizModel if full details are always needed.
    // For now, sticking to the original structure with N+1 potential.
    let incorrect_questions = [];
    let correct_questions = [];

    for (const userQuestion of latestCompletedQuiz.questions) {
      // Ensure question_id exists before trying to find it
      if (!userQuestion.question_id) continue;

      const questionModel = await Question.findById(
        userQuestion.question_id
      ).select("question options answer"); // Select only needed fields

      if (!questionModel) {
        // Handle case where a question might have been deleted from the main DB
        console.warn(
          `Question with ID ${userQuestion.question_id} not found for completed quiz review.`
        );
        // Optionally, add a placeholder to incorrect_questions or skip
        let _data = {
          question_id: userQuestion.question_id,
          question: "Question data not available",
          options: [],
          answer: null, // Correct answer unknown
          attempted: userQuestion.attempted,
          answer_status: userQuestion.answer_status,
          submitted_answer: userQuestion.submitted_answer,
        };
        incorrect_questions.push(_data); // Or decide how to handle this case
        continue;
      }

      let _data = {
        question_id: userQuestion.question_id,
        question: questionModel.question,
        options: questionModel.options, // Send options for review
        answer: questionModel.answer, // The actual correct answer
        attempted: userQuestion.attempted,
        answer_status: userQuestion.answer_status,
        submitted_answer: userQuestion.submitted_answer,
      };

      // Use the stored answer_status to categorize
      if (userQuestion.answer_status === ANSWER_STATUS_RIGHT) {
        correct_questions.push(_data);
      } else {
        // This includes ANSWER_STATUS_WRONG or even ANSWER_STATUS_PENDING
        // if a question was somehow not attempted but quiz was completed.
        incorrect_questions.push(_data);
      }
    }

    return res.status(200).json({
      success: true,
      result: latestCompletedQuiz.result,
      incorrect_questions,
      correct_questions,
      quizCompletedAt: latestCompletedQuiz.updatedAt, // Provide quiz completion time
    });
  } catch (error) {
    console.error("Error fetching completed quiz:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching completed quiz: " + error.message,
      });
  }
};

module.exports = { getCompletedQuiz };
