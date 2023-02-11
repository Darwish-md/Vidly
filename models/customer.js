const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");

const Customer = mongoose.model(
  "Customer",
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
      validate: function (value) {
        return validator.isEmail(value);
      },
    },
    phone: {
      type: String,
      required: true,
      validate: function (value) {
        return /^\d{7,15}$/.test(value);
      },
    },
    isGold: {
      type: Boolean,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\d{7,15}$/)
      .required(),
    isGold: Joi.boolean().required(),
  });

  return schema.validate(customer);
}

function validateUpdate(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\d{7,15}$/),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

module.exports = {Customer, validateCustomer, validateUpdate};
