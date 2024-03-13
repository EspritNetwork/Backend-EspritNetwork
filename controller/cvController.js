const Cv = require("../models/cv");

async function addCv(req, res) {
  try {
    const { biographie, experience, competence, langue, projets, education, certifications, user } = req.body;
    const cv = new Cv({ biographie, experience, competence, langue, projets, education, certifications, user });
    await cv.save();
    res.status(201).json({ message: "CV added successfully", cv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
    const updatedCv = await Cv.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
