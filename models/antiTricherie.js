const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AntiTricherie = new Schema({
	idOffre: {
		type: String,
	},
	idCandidat: {
		type: String,
	},
	idTest: {
		type: String,
	},

	message: {
		type: String,
	},
	etat: {
		type: Boolean,
		default: false,
	},
	typeApapreil: {
		type: String,
	},
	emplacement: {
		type: String,
	},
	rempliUneSeuleFois: {
		type: Boolean,
	},
	webcamActivee: {
		type: Boolean,
	},
	modePleinEcran: {
		type: Boolean,
	},
	sourisDansFenetre: {
		type: Boolean,
	},
	autorisationCamera: {
		type: Boolean,
	},
	autorisationMicro: {
		type: Boolean,
	},
	vedioNavigateur: {
		type: String,
	},
});

module.exports = mongoose.model("AntiTricherie", AntiTricherie);
