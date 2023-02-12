const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const auth = require('../middleware/auth');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie out of stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      isGold: customer.isGold
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  //TODO Here I need to use a library like Fawn for a cleaner code
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    rental = await rental.save();
    movie.numberInStock--;
    await movie.save();
    await session.commitTransaction();
    session.endSession();
    res.send(rental);
  } catch (err) {
    console.error(err);
    return res.status(500).send("something went wrong");
  }
});

module.exports = router;
