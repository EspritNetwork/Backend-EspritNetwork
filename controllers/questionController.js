const Question = require("../models/question");
const Technologie = require("../models/competence");
const Domaine = require("../models/domaine");
const { addCompetence } = require("./competenceController");
const { addDomaine } = require("./domaineController");
async function addQuestion(req, res) {
	try {
		const question = new Question(req.body);
		const tech = req.body.technologie;
		const dom = req.body.domaine;
		const technologie = Technologie.find({ name: tech });
		console.log(technologie);

		const domaine = Domaine.find({ name: dom });

		if (!technologie) {
			console.log(domaine);
			await addCompetence({ name: tech });
		}
		if (!domaine) {
			await addDomaine({ name: dom });
		}
		await question.save();
		res.status(201).json({ message: "Question added successfully", question });
	} catch (err) {
		console.error(err.message);
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
async function deleteAllQuestions(req, res) {
	try {
		await Question.find().deleteMany();
		res.status(200).json({ message: "All questions deleted successfully" });
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
		res.status(200).json({
			message: "Question deleted successfully",
			question: deletedQuestion,
		});
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function updateQuestion(req, res) {
	try {
		const updatedQuestion = await Question.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: "Question updated successfully",
			question: updatedQuestion,
		});
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
	deleteAllQuestions,
};
