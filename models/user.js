const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
const bcrypt = require('bcrypt');

const User = mongoose.model(
    "user",
    new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: function (value) {
          return validator.isEmail(value);
        },
      },
      password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
      }
    })
  );

function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(10).max(100).required()
    });
    
    return schema.validate(user);
}

async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}

module.exports = { User, validateUser, hashPassword};