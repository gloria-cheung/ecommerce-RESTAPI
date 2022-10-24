const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken");

//create cart
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newCart = Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update cart
//delete cart
//get cart

module.exports = router;
