const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");

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
router.get("/find/:id", verifyTokenAndAuth, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing userID");
  }

  try {
    // return array of orders
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get all orders (admin)
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get monthly income stat for last 2 months
router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  // current date now => current month now => last month => set last month variable, then repeat to find previous month
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          income: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
