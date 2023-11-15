const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create a new Schema that has the values and what type those values should be. The structure of the document
const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

//The modle is what we use methods on to proform actions on the DB E.G workout.find()
module.exports = mongoose.model('Workout', workoutSchema);
