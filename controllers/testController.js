const Test = require("../models/test");
const Question = require("../models/question");
const PassageTest = require("../models/PassageTest");
async function addTest(req, res) {
	try {
		const test = new Test(req.body);
		console.log(test);
		await test.save();
		res.status(201).json({ message: "Test added successfully", test });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

async function addAutomaticTest(req, res) {
	try {
		console.log(req.body);
		const domaine = req.body.domaine;
		const categorie = req.body.categorie;
		const technologie = req.body.technologie;
		const description = req.body.description;
		const duree = req.body.duree;
		const nbQN1 = parseInt(req.body.nbQN1);
		const nbQN2 = parseInt(req.body.nbQN2);
		const nbQN3 = parseInt(req.body.nbQN3);
		let questionsN1 = [];
		let questionsN2 = [];
		let questionsN3 = [];
		let ok = false;
		let data = [];
		const nbQuestion = nbQN1 + nbQN2 + nbQN3;
		console.log(req.body.nbQN1);
		console.log("..Nombres des question pour le test : " + nbQuestion);
		console.log("1. generer des question pour le test pour chaque niveau ");
		if (nbQN1) {
			let question = await Question.find({
				technologie: technologie,
				niveau: "Basique",
			});

			data = question;

			for (let i = 0; i < nbQN1; i++) {
				let n = Math.floor(Math.random() * (data.length - 1));
				n = n + 1 > data.length - 1 ? n : n + 1;
				console.log(n, data.length);
				var Q = data[n];
				questionsN1.push(Q);
			}
			console.log("questionsN1 " + questionsN1);
			ok = true;
		}
		if (nbQN2) {
			let question = await Question.find({
				technologie: technologie,
				niveau: "Intermédiaire",
			});
			data = question;
			console.log("questionsN2 ", data);
			for (let i = 0; i < nbQN2; i++) {
				let n = Math.floor(Math.random() * (data.length - 1));
				n = n + 1 > data.length - 1 ? n : n + 1;
				console.log(n, data.length);
				var Q = data[n];
				questionsN2.push(Q);
			}
			ok = true;
		}
		if (nbQN3) {
			let question = await Question.find({
				technologie: technologie,
				niveau: "Avancé",
			});
			data = question;
			for (let i = 0; i < nbQN3; i++) {
				let n = Math.floor(Math.random() * (data.length - 1));
				n = n + 1 > data.length - 1 ? n : n + 1;
				console.log(n, data.length);
				var Q = data[n];
				questionsN3.push(Q);
			}
			console.log("questionsN3:  " + questionsN3);
			ok = true;
		}

		let questions = [].concat(questionsN1, questionsN2, questionsN3);
		console.log("questions" + questions);

		console.log("3. Affecter le test à ");
		console.log("ok = ", ok);
		if (ok === true) {
			const test = await Test.create({
				domaine,
				categorie,
				technologie,
				questions,
				duree,
				description,
			});
			console.log("le tests ont été effectué  avec succès", test);
		} else {
			console.log("Probléme lors de la création du test");
			return res
				.status(500)
				.json({ message: "Probléme lors de la création du test", ok });
		}

		return res.status(200).json({
			message: "Test à été cree  avec succès",
		});
	} catch (errors) {
		console.log(errors.message);
		return res.status(500).json({ message: errors.message });
	}
}
async function deleteAllTest(req, res) {
	try {
		await test.find().deleteMany();
		res.status(200).json({ message: "All tests deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function getAllTests(req, res) {
	try {
		const tests = await Test.find();
		res.status(200).json(tests);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function getTestById(req, res) {
	try {
		const test = await Test.findById(req.params.id);
		res.status(200).json(test);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function deleteTest(req, res) {
	try {
		const deletedTest = await Test.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: "Test deleted successfully", test: deletedTest });
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function updateTest(req, res) {
	try {
		const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res
			.status(200)
			.json({ message: "Test updated successfully", test: updatedTestev });
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
async function getbyCandidat(req, res) {
	try {
		const idCandidat = req.query.idCandidat;
		const tests = await PassageTest.find({ idCandidat: idCandidat });
		resultat = [];
		for (let i = 0; i < tests.length; i++) {
			const test = await Test.findById(tests[i].idTest);
			resultat.push({ ...test, date: tests[i].date, etat: tests[i].etat });

			console.log("resultat", resultat);
		}
		console.log("tests", resultat);

		res.status(200).json(resultat);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
async function AffecterTestToCondidat(req, res) {
	try {
		const resultat = new PassageTest(req.body);
		console.log(resultat);
		await resultat.save();
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
module.exports = {
	addTest,
	addAutomaticTest,
	getAllTests,
	getTestById,
	deleteTest,
	updateTest,
	deleteAllTest,
	getbyCandidat,
	AffecterTestToCondidat,
};