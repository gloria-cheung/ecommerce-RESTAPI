const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken");

//create order
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update order (admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing orderID");
  }

  // set new:true in order to return back the updated version
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//delete order (admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing orderID");
  }

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get orders for user
router.get("/find/:userId", verifyTokenAndAuth, async (req, res, next) => {
  if (!req.params.userId) {
    return res.status(400).json("missing userID");
  }

  try {
    // return array of orders
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
