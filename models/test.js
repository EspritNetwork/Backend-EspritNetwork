const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    datetest: {
        type: Date,
        required: true,
    },
    titre: {
        type: String,
        required: true,
    },
    duree: {
        type: Number,
        required: true,
    },
    resultat: {
        type: Number,
    },
    
    // here we represente forign key user 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


module.exports = mongoose.model("Test", TestSchema);
