const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CvSchema = new Schema({
    biographie: {
        type: String,
    },
    experience: {
        type: String,
    },
    competence: {
        type: String,
    },
    langue: {
        type: String,
    },
    projets: {
        type: String,
    },
    education: {
        type: String,
    },
    certifications: {
        type: String,
    },
    // here we represente forign key user 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model("Cv", CvSchema);
