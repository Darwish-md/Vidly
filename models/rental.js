const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
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
        default: false
      }   
    }),  
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }
}));

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().hex().length(24).required(),
    movieId:  Joi.string().hex().length(24).required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
