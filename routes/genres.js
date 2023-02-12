const express = require("express");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenre } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  //update first approach
  /*const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const result = await Genre.updateOne({ _id: id }, {
        $set: {
            name: req.params.name
        }
    });

    res.send(result);*/

  //Query first approach
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
