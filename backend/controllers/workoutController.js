const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({
        createdAt: -1,
    });

    res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
    //Get the passed id from the req.params by destructuring
    const { id } = req.params;

    //Use mongoose to check and make sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ error: 'No such workout' });
    }

    //Query the DB to see if there is a workout with that id
    const workout = await Workout.findById(id);

    //If there is no workout with that id return the error message.
    if (!workout) {
        //use a return here to end the code and show the error message.
        return res.status(404).json({ err: 'No such workout' });
    }

    //If all goes well send back a status code of 200/ok and pass the workout json information.
    res.status(200).json(workout);
};

//create new workout
const createWorkout = async (req, res) => {
    //Destructor the value from the body needed
    const { title, load, reps } = req.body;

    //cratea an array that will hold the value of the field that is empty
    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
        console.log('hello' + emptyFields);
        return res.status(400).json({
            error: 'Please fill in all the fields',
            emptyFields,
        });
    }

    //preform a try/catch when trying to add the document to the DB
    try {
        //use create to take the values and put them in a json variable
        const workout = await Workout.create({
            title,
            load,
            reps,
        });
        //respond with status 200 if everythng went well and show the json document we just created.
        res.status(200).json(workout);
        //Deal with an error in the catch
    } catch (error) {
        //return status 400 and pass the error message as json
        res.status(400).json({ error: error.message });
    }
};

//delete a workout
const deleteWorkout = async (req, res) => {
    //Get the id of the workout to be deleted from req.params
    const { id } = req.params;

    //check to see if the id is valid with mongoose types isVaild, if not return a status of 404 and the error message.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ error: 'No such workout' });
    }

    //Find and delete the workout from the database with findOnceAndDelete()
    const workout = await Workout.findOneAndDelete({ _id: id });

    //If we dont have a workout return an error message.
    if (!workout) {
        return res
            .status(404)
            .json({ error: 'No such workout' });
    }

    //if everyting worked ok send a response with status of 200 and the json document
    res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
    //Get the id of the workout to be deleted from req.params
    const { id } = req.params;

    //check to see if the id is valid with mongoose types isVaild, if not return a status of 404 and the error message.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ error: 'No such workout' });
    }

    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    //If we dont have a workout return an error message.
    if (!workout) {
        return res
            .status(404)
            .json({ error: 'No such workout' });
    }

    //if everyting worked ok send a response with status of 200 and the json document
    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
};
