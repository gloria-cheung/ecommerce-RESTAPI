const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

//create order
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
