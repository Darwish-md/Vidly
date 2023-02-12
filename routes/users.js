const express = require("express");
const _ = require('lodash');
const { User, validateUser, hashPassword } = require("../models/user");
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email});
  if (user) return res.status(400).send("This email is already registered.");
  
  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  user.password = await hashPassword(user.password);
  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

module.exports = router;
