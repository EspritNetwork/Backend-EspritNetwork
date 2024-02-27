const Question = require("../models/question");

async function addQuestion(req, res) {
  try {
    const { description, options, correctresponse, tag, user } = req.body;
    const question = new Question({ description, options, correctresponse, tag, user });
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteQuestion(req, res) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted successfully", question: deletedQuestion });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateQuestion(req, res) {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
  updateQuestion,
};
