const Cv = require("../models/cv");

<<<<<<< HEAD
const defaultUserId = "65e72cf7bd24320b86a09630";

async function addCv(req, res) {
	try {
		const {
			contact,
			biographie,
			parcoursProfessionnels,
			parcoursAcademiques,
			competences,
			langues,
		} = req.body;
		const existingCv = await Cv.findOne({ user: defaultUserId }); // Utilisation de l'ID utilisateur statique
		if (existingCv) {
			// Mise à jour du CV existant
			const updatedCv = await Cv.findByIdAndUpdate(
				existingCv._id,
				{
					contact,
					biographie,
					parcoursProfessionnels,
					parcoursAcademiques,
					competences,
					langues,
				},
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "CV updated successfully", cv: updatedCv });
		} else {
			// Création d'un nouveau CV
			const cv = new Cv({
				contact,
				biographie,
				parcoursProfessionnels,
				parcoursAcademiques,
				competences,
				langues,
				user: defaultUserId,
			}); // Utilisation de l'ID utilisateur statique
			await cv.save();
			return res.status(201).json({ message: "CV added successfully", cv });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
=======

const defaultUserId = "65e383ad98ae7547e1fb5843";

async function addCv(req, res) {
  try {
    const { contact, biographie, parcoursProfessionnels, parcoursAcademiques, competences, langues } = req.body;
    const existingCv = await Cv.findOne({ user: defaultUserId }); // Utilisation de l'ID utilisateur statique
    if (existingCv) {
      // Mise à jour du CV existant
      const updatedCv = await Cv.findByIdAndUpdate(existingCv._id, { contact, biographie, parcoursProfessionnels, parcoursAcademiques, competences, langues }, { new: true });
      return res.status(200).json({ message: "CV updated successfully", cv: updatedCv });
    } else {
      // Création d'un nouveau CV
      const cv = new Cv({ contact, biographie, parcoursProfessionnels, parcoursAcademiques, competences, langues, user: defaultUserId }); // Utilisation de l'ID utilisateur statique
      await cv.save();
      return res.status(201).json({ message: "CV added successfully", cv });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
>>>>>>> 7d1f7a4beba115d36361cce2aec66d4c7f1e0710
}

async function getAllCvs(req, res) {
	try {
		const cvs = await Cv.find();
		res.status(200).json(cvs);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}


async function getCvById(req, res) {
	try {
		const cv = await Cv.findById(req.params.id);
		res.status(200).json(cv);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function deleteCv(req, res) {
	try {
		const deletedCv = await Cv.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "CV deleted successfully", cv: deletedCv });
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

async function updateCv(req, res) {
	try {
		const updatedCv = await Cv.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({ message: "CV updated successfully", cv: updatedCv });
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

module.exports = {
	addCv,
	getAllCvs,
	getCvById,
	deleteCv,
	updateCv,
};
