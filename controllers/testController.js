const Test = require("../models/test");
const Offre = require("../models/offre");
const Question = require("../models/question");
const PassageTest = require("../models/PassageTest");
const { response } = require("express");
const { SendMAilPourPassTest } = require("./interviewController");
const User = require("../models/user");
const AntiTricherie = require("../models/antiTricherie");
const { updateStatusCandidacy } = require("./condidacyController");
const condidacy = require("../models/condidacy");

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
		console.log("err", err.message);
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
		const updatedTest = await Test.findByIdAndUpdate(
			req.params.id,
			req.body.test,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: "Test updated successfully", test: updatedTest });
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
			resultat.push({
				...test,
				date: tests[i].date,
				etat: tests[i].etat,
				test: test,
			});
		}
		res.status(200).json(resultat);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
/**passage des tests : Section :  */

async function affecterTestAuCandidat(req, res) {
	try {
		console.log("affecterTestAuCandidat");
		const { idTest, idCandidat, idOffre } = req.body;
		let data = req.body;
		console.log(req.body);
		console.log(idTest, idCandidat);
		const exist = await PassageTest.findOne({ idTest, idCandidat });
		if (exist) {
			return res
				.status(400)
				.json({ message: "Le test a déjà été envoyé au candidat." });
		}

		if (!idCandidat) {
			return res
				.status(400)
				.json({ message: "Veuillez sélectionner un candidat." });
		}
		// Formater la date (dd-mm-yyyy)

		let invited_at = new Date();
		invited_at = `${invited_at.getFullYear()}-${String(
			invited_at.getMonth() + 1
		).padStart(2, "0")}-${String(invited_at.getDate()).padStart(2, "0")}`;
		console.log("invited_at", invited_at);

		const newPassageTest = new PassageTest({ ...data, invited_at: invited_at });

		// Sauvegarder le nouvel enregistrement dans la base de données
		await newPassageTest.save();
		console.log(newPassageTest);
		/***Envoyer un mail au candidat pour le informer de ce test*/
		const candidat = await User.findById(idCandidat);
		SendMAilPourPassTest(candidat);
		const status = "Invité pour un test technique";
		await condidacy.findOneAndUpdate(
			{ user: idCandidat, offre: idOffre },
			{ $set: { status: status } },
			{ new: true }
		);

		// console.log(updateStatusCandidacy(idCandidat, data.idOffre, status));
		// Répondre avec succès
		return res.status(201).json({
			message: "Le test a été envoyé avec succès.",
			test: newPassageTest,
		});
	} catch (error) {
		console.error("Erreur lors de l'affectation du test au candidat :", error);
		return res.status(500).json({
			error:
				"Une erreur est survenue lors de l'affectation du test au candidat.",
		});
	}
}

async function PassTest(req, res) {
	try {
		console.log("Appel fonction de passage de test : ", PassTest);
		const { idTest, reponses, idCandidat, antiCheating } = req.body;

		// Chercher si le candidat a déjà passé le test et mettre à jour ou créer le passage de test
		let passage = await PassageTest.findOne({
			idTest: idTest,
			idCandidat: idCandidat,
		});
		if (passage) {
			if (passage.response.length > 0) {
				await PassageTest.findOneAndUpdate(
					{ idTest: idTest, idCandidat: idCandidat },
					{ $set: { response: "", etat: true } },
					{ new: true }
				);
			}
		}
		await PassageTest.findOneAndUpdate(
			{ idTest: idTest, idCandidat: idCandidat },
			{ $set: { response: reponses, etat: true, passed_at: new Date() } },
			{ new: true }
		);

		// Calcul du score en parcourant les réponses et les questions
		let score = 0;
		const test = await Test.findById(idTest);
		const questions = test.questions;
		for (let i = 0; i < questions.length; i++) {
			const questionId = questions[i]._id.toString();
			const response = reponses.find((item) => item.idQuestion === questionId);
			if (response) {
				const question = questions[i];
				const option = question.options.find(
					(opt) => opt.option === response.reponse && opt.isCorrect
				);
				if (option) {
					if (question.niveau === "Basique") {
						score += 1;
					} else if (question.niveau === "Intermédiaire") {
						score += 2;
					} else {
						score += 3;
					}
				}
			}
		}

		// Mettre à jour le score du passage de test
		const result = await PassageTest.findOneAndUpdate(
			{ idTest: idTest, idCandidat: idCandidat },
			{ $set: { score: score } },
			{ new: true }
		);
		console.log("antiCheating", antiCheating);

		const dataAntiCheanting = {
			idTest: idTest,
			idCandidat: idCandidat,
			autorisationCamera: antiCheating.autorisationCamera,
			autorisationFullScreen: antiCheating.autorisationFullScreen,
			sourisDansFenetre: antiCheating.sourisDansFenetre,
			typeApapreil: antiCheating.typeApapreil,
			cameraActivated: antiCheating.cameraActivated,
			isFullScreen: antiCheating.isFullScreen,
			isMouseInsideWindow: antiCheating.isMouseInsideWindow,
		};
		console.log("dataAntiCheanting", dataAntiCheanting);

		const antiTricherie = new AntiTricherie(dataAntiCheanting);

		await antiTricherie.save();

		res.status(200).json({ message: "Added successfully", test: result });
	} catch (error) {
		console.log("error", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}

async function getTestPasserbyCandidat(req, res) {
	try {
		console.log("getTestPasserbyCandidat  ");
		const { idCandidat } = req.query;
		const tests = await PassageTest.find({ idCandidat: idCandidat });
		resultat = [];
		for (let i = 0; i < tests.length; i++) {
			const test = await Test.findById(tests[i].idTest);
			const off = await Offre.findById(tests[i].idOffre);
			resultat.push({
				...test,
				passage: tests[i],
				test: test,
				offre: off,
			});
		}
		// console.log(resultat);

		res.status(200).json(resultat);
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
	affecterTestAuCandidat,
	PassTest,
	getTestPasserbyCandidat,
};
