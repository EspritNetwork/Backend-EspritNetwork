const Test = require("../models/test");
const Offre = require("../models/offre");
const PassageTest = require("../models/PassageTest");

async function getResultTestsByOffre(req, res) {
	try {
		const { idOffre } = req.query;
		const resultat = await PassageTest.find({ idOffre: idOffre });

		res.status(200).json(resultat);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function getAllResultsTests(req, res) {
	try {
		/* return  tab contient :
               nom de candidat, nom de test, note de test, id de test, id de candidat , id de l'offre et titele de l'offre		
        */
		const resTests = await PassageTest.aggregate([
			{
				$lookup: {
					from: "tests",
					let: { testId: { $toObjectId: "$idTest" } },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$testId"] } } },
						{ $project: { _id: 0, technologie: 1, questions: 1 } },
					],
					as: "test",
				},
			},
			{
				$lookup: {
					from: "users",
					let: { userId: { $toObjectId: "$idCandidat" } },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
						{ $project: { _id: 0, name: 1, email: 1 } },
					],
					as: "candidat",
				},
			},
			{
				$lookup: {
					from: "offres",
					let: { offreId: { $toObjectId: "$idOffre" } },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$offreId"] } } },
						{
							$project: {
								titre: 1,
								typeoffre: 1,
								created_at: {
									$dateToString: { format: "%Y-%m-%d", date: "$created_at" },
								},
							},
						},
					],
					as: "offre",
				},
			},
			// Convert candidat, test, and offre arrays to objects
			{
				$addFields: {
					candidat: { $arrayElemAt: ["$candidat", 0] },
					test: { $arrayElemAt: ["$test", 0] },
					offre: { $arrayElemAt: ["$offre", 0] },
				},
			},
			// Additional stages or project stage if needed
		]);

		res.status(200).json(resTests);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

module.exports = {
	getAllResultsTests,
	getResultTestsByOffre,
};
