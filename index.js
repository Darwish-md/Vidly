const config = require('config');
const express = require("express");
const mongoose = require("mongoose");
//to use: DEBUG=app:db nodemon
const dbDebugger = require("debug")("app:db");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

//we need to export the env var on terminal using: export vidly_jwtPrivateKey=<ourSecretKey>
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const uri =
  "mongodb+srv://kali:kali@cluster0.u2xijug.mongodb.net/Vidly?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => dbDebugger("Connected to mongodb."))
  .catch((err) => dbDebugger("Could not connect to mongodb"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));