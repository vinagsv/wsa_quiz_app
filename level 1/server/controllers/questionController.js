import Question from "../models/questionModel.js";
const MAX_QUESTION_COUNT = 30;

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: MAX_QUESTION_COUNT } },
      { $project: { question: 1, options: 1 } },
    ]);

    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.log("Error fetching questions", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addAnswer = async (req, res) => {
  try {
    const { id, answer } = req.body;

    if (!id || !answer || !answer.id || !answer.value) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "No Question found" });
    }

    if (
      question.answer.id === answer.id &&
      question.answer.value === answer.value
    ) {
      return res
        .status(200)
        .json({ success: true, message: "Correct answer! 🎉" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Wrong answer. Try again!" });
    }
  } catch (error) {
    console.log("Error while answering", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { getQuestions, addAnswer };
