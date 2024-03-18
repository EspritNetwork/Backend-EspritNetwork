const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PassageTest = new Schema({
	idOffre: {
		type: String,
	},
	idCandidat: {
		type: String,
	},
	idTest: {
		type: String,
	},
	note: {
		type: Number,
	},
	date: {
		type: Date,
	},
	response: {
		type: Array,
	},
	message: {
		type: String,
	},
	etat: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("PassageTest", PassageTest);
