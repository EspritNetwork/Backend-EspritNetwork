const Condidacy = require("../models/condidacy");

async function addCondidacy(req, res) {
  try {
    const { date_postule, status, affiliation, document, specialite, anneediplome, user } = req.body;
    const condidacy = new Condidacy({ date_postule, status, affiliation, document, specialite, anneediplome, user });
    await condidacy.save();
    res.status(201).json({ message: "Condidacy added successfully", condidacy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllCondidacies(req, res) {
  try {
    const condidacies = await Condidacy.find().populate('user'); // Use populate to include user details
    res.status(200).json(condidacies);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getCondidacyById(req, res) {
  try {
    const condidacy = await Condidacy.findById(req.params.id).populate('user'); // Use populate to include user details
    res.status(200).json(condidacy);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteCondidacy(req, res) {
  try {
    const deletedCondidacy = await Condidacy.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Condidacy deleted successfully", condidacy: deletedCondidacy });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateCondidacy(req, res) {
  try {
    const updatedCondidacy = await Condidacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Condidacy updated successfully", condidacy: updatedCondidacy });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addCondidacy,
  getAllCondidacies,
  getCondidacyById,
  deleteCondidacy,
  updateCondidacy,
};
