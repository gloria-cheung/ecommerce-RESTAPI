const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//create cart
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update cart
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing cartID");
  }

  // set new:true in order to return back the updated version
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//delete cart
router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing cartID");
  }

  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get user's cart
router.get("/find/:id", verifyTokenAndAuth, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing userID");
  }

  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get all carts (admin)
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
