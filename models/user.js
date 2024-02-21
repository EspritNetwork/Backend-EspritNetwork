const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//All the champs are optional

const userSchema = new Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    specialite: {
        type: String,
    },
    cin: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    adresse: {
        type: String,
    },
    téléphone: {
        type: Number,
    },
    cv: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['student', 'alumni', 'esprit_staff', 'teacher', 'company'],
    },
    nameC: {
        type: String,
    },
    adresseC: {
        type: String,
    },
    descriptionC: {
        type: String,
    },
    logoC: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
