const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CvSchema = new Schema({
    contact: {
        nom: {
          type: String
        },
        prenom: {
          type: String
        },
        email: {
          type: String
        },
        telephone: {
          type: String
        },
        adresse: {
          type: String
        },
        lienGit: String,
        lienLinkedIn: String
      },
      biographie: String,
      parcoursProfessionnels: [{
        poste: String,
        dateDebut: Date,
        dateFin: Date,
        nomEntreprise: String,
        description: String
      }],
      parcoursAcademiques: [{
        diplome: String,
        etablissement: String,
        dateDebut: Date,
        dateFin: Date
      }],
      competences: [String],
      langues: [String],
      
    // here we represente forign key user 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model("Cv", CvSchema);



