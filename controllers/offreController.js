const Offre = require("../models/offre");

async function addOffre(req, res) {
  try {
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience,created_at, user } = req.body;
    const offre = new Offre({ titre, typeoffre, description, competence, typecontrat, salaire, langue, experience,created_at, user });
    await offre.save();
    res.status(201).json({ message: "Offre added successfully", offre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllOffres(req, res) {
  try {
    const offres = await Offre.find({ statusOffre: true }).populate('user');
    res.status(200).json(offres);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getOffreById(req, res) {
  try {
    const offre = await Offre.findById(req.params.id)
    res.status(200).json(offre);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

const getOfferByIdUser = async (req, res) => {
  try {
    const offers = await Offre.find({ user: req.params.id }).populate('user');
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function deleteOffre(req, res) {
  try {
    const updatedOffre = await Offre.findByIdAndUpdate(
      req.params.id,
      { $set: { statusOffre: false } },
      { new: true }
    );

    if (!updatedOffre) {
      return res.status(404).json({ message: "Offre not found" });
    }

    res.status(200).json({ message: "Offre status updated successfully", offre: updatedOffre });
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
  getOfferByIdUser,
  getOffreById,
  deleteOffre,
  updateOffre,

};
