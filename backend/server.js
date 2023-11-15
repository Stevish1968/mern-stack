require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workout');

//express app
const app = express();

//Middleware
//Any request that comes in looks to see if there is some body/data to the request, then attaches it to the req object.
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Routes handelers
app.use('/api/workouts', workoutRoutes);

//Listen for requests on ports number
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000');
});
