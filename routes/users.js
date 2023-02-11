const express = require("express");
const _ = require('lodash');
const { User, validateUser, hashPassword } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email});
  if (user) return res.status(400).send("This email is already registered.");
  
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  user.password = await hashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
