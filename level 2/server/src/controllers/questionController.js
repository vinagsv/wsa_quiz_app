const {
  UserQuiz: UserQuizModel,
  QUIZ_STATUS_PENDING,
  ANSWER_STATUS_PENDING,
  ANSWER_STATUS_RIGHT,
  ANSWER_STATUS_WRONG,
} = require("../models/userQuizModel");
const Question = require("../models/questionModel");

const getQuestions = async (req, res) => {
  try {
    //find incomplete quiz for the user and populate question details in one Query
    let userQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_PENDING,
    }).populate("questions.question_id", "question options");

    //if no incomplete quiz exists, create a new one
    if (!userQuiz) {
      //get random questions from the database (without answer)
      const randomQuestions = await Question.aggregate([
        { $sample: { size: 5 } },
        { $project: { question: 1, options: 1 } },
      ]);

      //format questions for user quiz document
      const quizQuestions = randomQuestions.map((question) => ({
        question_id: question._id,
        attempted: false,
        answer_status: ANSWER_STATUS_PENDING,
        submitted_answer: null,
      }));

      //create a new quiz and save
      userQuiz = await new UserQuizModel({
        user_id: req.user._id,
        quiz_status: QUIZ_STATUS_PENDING,
        questions: quizQuestions,
      }).save();

      //populate the newly created quiz with question details
      userQuiz = await UserQuizModel.findById(userQuiz._id).populate(
        "questions.question_id",
        "question options"
      );
    }

    // format the response data by combining question content with user's progress
    const questions = userQuiz.questions
      .map((q) => {
        if (!q.question_id) {
          return null;
        }
        return {
          _id: q.question_id._id,
          question: q.question_id.question,
          options: q.question_id.options,
          attempted: q.attempted,
          answer_status: q.answer_status,
          submitted_answer: q.submitted_answer,
        };
      })
      .filter((q) => q !== null); //remove any null entries

    return res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Error fetching quiz questions:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const validateAnswer = async (req, res) => {
  try {
    //extract questionId and answer from body
    const { questionId, answer } = req.body;
    //validate
    if (!questionId || !answer || !answer.id || !answer.value) {
      return res.status(400).json({ message: "Invalid request" });
    }

    //find by Question by Id
    let question = await Question.findById(questionId);

    //Validation
    if (!question) {
      return res.status(400).json({ message: "Question does not exist" });
    }

    //checking of the answer
    let answerStatus = false;
    if (
      question.answer.id === answer.id &&
      question.answer.value === answer.value
    ) {
      answerStatus = true;
    }

    const updatedUserQuiz = await UserQuizModel.findOneAndUpdate(
      {
        "questions.question_id": questionId,
        user_id: req.user._id,
        quiz_status: QUIZ_STATUS_PENDING,
      },
      {
        $set: {
          "questions.$.attempted": true,
          "questions.$.answer_status": answerStatus
            ? ANSWER_STATUS_RIGHT
            : ANSWER_STATUS_WRONG,
          "questions.$.submitted_answer": answer,
        },
      },
      { new: true }
    );

    //update the result using instance methods
    if (updatedUserQuiz) {
      await updatedUserQuiz.updateResult();
    }

    return res.status(200).json({
      status: answerStatus ? 1 : 0,
      message: answerStatus ? "Correct answer :)" : "Wrong answer :(",
      submitted_answer: answer,
      correct_answer: question.answer,
    });
  } catch (error) {
    console.error("Error validating answer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getQuestions, validateAnswer };
