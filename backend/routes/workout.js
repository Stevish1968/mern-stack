const express = require('express');
const Workout = require('../models/workoutModel');

const router = express.Router();

//GET all the workouts
router.get('/', (req, res) => {
    res.json({ mssg: 'GET all workouts' });
});

//GET a single workout
router.get('/:id', (req, res) => {
    res.json({ mssg: 'GET a single workout' });
});

//POST a new workout,
router.post('/', async (req, res) => {
    //Destructor the value from the body needed
    const { title, load, reps } = req.body;

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
});

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a workout' });
});

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a new workout' });
});

module.exports = router;
