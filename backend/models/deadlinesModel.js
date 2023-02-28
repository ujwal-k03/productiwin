const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
    }
})

const deadlinesSchema = new Schema({
    deadlines: [deadlineSchema]
}, { timestamps: true});

module.exports = {
    deadlinesModel: mongoose.model('Deadlines', deadlinesSchema),
    deadlineModel: mongoose.model('Deadline', deadlineSchema)
};