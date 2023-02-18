const express = require("express");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {
  Customer,
  validateCustomer,
  validateUpdate,
} = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.message);

  let customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", auth, validateObjectId, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.message);

  let customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  customer.set({
    name: req.body.name || customer.name,
    email: req.body.email || customer.email,
    phone: req.body.phone || customer.phone,
    isGold: req.body.isGold || customer.isGold,
  });

  await customer.save();

  res.send(customer);
});

router.delete("/:id", [auth, admin], validateObjectId, async (req, res) => {
  const customer = await Customer.findByIdAndDelete({ _id: req.params.id });

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
