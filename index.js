const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const mongoose = require('mongoose');
//to use: DEBUG=app:db nodemon
const dbDebugger = require('debug')('app:db');
const app = express();

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => dbDebugger('Connected to mongodb.'))
    .catch(err => dbDebugger('Could not connect to mongodb'));
    
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));