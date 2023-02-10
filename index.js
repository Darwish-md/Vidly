const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const app = express();

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => dbDebugger('Connected to mongodb.'))
    .catch(err => dbDebugger('Could not connect to mongodb'));
    
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));