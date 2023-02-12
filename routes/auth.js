const express = require("express");
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password.");
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password.');
  
  const token = user.generateAuthToken();

  res.send(token);
});

function validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    return schema.validate(user);
}

module.exports = router;