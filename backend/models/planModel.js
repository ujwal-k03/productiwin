const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "blue",
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

const planSchema = new Schema({
    _id: false,
    userid: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        default: "Untitled Plan"
    },
    date: {
        type: Date,
        required: true,
        unique: false,
    },
    tasks: {
        type: [taskSchema],
        required: true,
        default: [],
    }
});

module.exports = {
    TaskModel: mongoose.model('tasks', taskSchema),
    PlanModel: mongoose.model('plans', planSchema),
}