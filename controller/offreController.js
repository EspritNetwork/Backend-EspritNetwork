const Offre = require("../models/offre");

async function addOffre(req, res) {
  try {
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, user } = req.body;
    const offre = new Offre({ titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, user });
    await offre.save();
    res.status(201).json({ message: "Offre added successfully", offre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllOffres(req, res) {
  try {
    const offres = await Offre.find().populate('user'); // Use populate to include user details
    res.status(200).json(offres);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getOffreById(req, res) {
  try {
    const offre = await Offre.findById(req.params.id).populate('user'); // Use populate to include user details
    res.status(200).json(offre);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteOffre(req, res) {
  try {
    const deletedOffre = await Offre.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Offre deleted successfully", offre: deletedOffre });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateOffre(req, res) {
  try {
    const updatedOffre = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Offre updated successfully", offre: updatedOffre });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addOffre,
  getAllOffres,
  getOffreById,
  deleteOffre,
  updateOffre,
};
