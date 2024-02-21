const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctresponse: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    // here we represente forign key user 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // here we represente forign key test 
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
    },
});

module.exports = mongoose.model("Question", QuestionSchema);
