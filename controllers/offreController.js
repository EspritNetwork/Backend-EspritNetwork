const Offre = require("../models/offre");

async function addOffre(req, res) {
  try {
    // Destructure the request body
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, created_at, user } = req.body;

    // Input validation
    const errors = {
      titre: titre.length === 0 ? 'Le titre est obligatoire !' : (titre.length > 30 ? 'Le titre ne doit pas dépasser 30 caractères.' : ''),
      typeoffre: typeoffre.length === 0 ? 'Type d\'offre est obligatoire !' : '',
      description: description.length === 0 ? 'Description de l\'offre est obligatoire !' : (description.length > 1300 ? 'La description ne doit pas dépasser 1300 caractères.' : ''),
      competence: competence.length === 0 ? 'Compétence de l\'offre est obligatoire !' : '',
      typecontrat: typecontrat ? '' : 'Type de contrat de l\'offre est obligatoire !',
    };

    // Check for errors in the validation
    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      // If there are validation errors, return a 400 Bad Request with error details
      return res.status(400).json({ errors });
    }

    // If validation passes, create and save the Offre instance
    const offre = new Offre({ titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, created_at, user });
    await offre.save();

    // Return a success response
    res.status(201).json({ message: "Offre added successfully", offre });
  } catch (err) {
    // Handle internal server error
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
    const offre = await Offre.findById(req.params.id).populate('user');
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
    // Destructure the request body
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, created_at, user } = req.body;

    // Input validation
    const errors = {
      titre: titre && titre.length > 30 ? 'Le titre ne doit pas dépasser 30 caractères.' : '',
      typeoffre: typeoffre.length === 0 ? 'Type d\'offre est obligatoire !' : '',
      description: description && description.length > 1300 ? 'La description ne doit pas dépasser 1300 caractères.' : '',
      competence: competence.length === 0 ? 'Compétence de l\'offre est obligatoire !' : '',
      typecontrat: typecontrat ? '' : 'Type de contrat de l\'offre est obligatoire !',
    };

    // Check for errors in the validation
    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      // If there are validation errors, return a 400 Bad Request with error details
      return res.status(400).json({ errors });
    }

    // Update the Offre instance
    const updatedOffre = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Return a success response
    res.status(200).json({ message: "Offre updated successfully", offre: updatedOffre });
  } catch (err) {
    // Handle internal server error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
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
