const Interview = require("../models/interview");
const { authorize, createSpace } = require("../meet");

async function PlanifierEntretien(req, res) {
	try {
		const { date, idCandidat, idOffre } = req.body;
		// Authorize and create meeting space
		const authClient = await authorize();
		const link = await createSpace(authClient);

		// Save meeting link to the database
		const data = { date, idCandidat, idOffre, link };
		console.log("data ", data);
		const interview = new Interview(data);
		await interview.save();
		res
			.status(201)
			.json({ message: "interview added successfully", interview });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
module.exports = {
	PlanifierEntretien,
};
