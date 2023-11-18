require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');
const cors = require('cors');

//express app
const app = express();

//Middleware
//Any request that comes in looks to see if there is some body/data to the request, then attaches it to the req object.
app.use(express.json());
app.use(cors());

//Adding cors to make crossbrower to work
// const corsOptions = {
//     origin: 'http://localhost:4000',
//     optionsSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Routes handelers
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);



//connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests on ports number
        app.listen(process.env.PORT, () => {
            console.log(
                'listening to DB & listening on port',
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
