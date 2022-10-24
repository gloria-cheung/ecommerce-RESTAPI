const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

//create product
router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    // if await new Product(req.body) => need to call .save()
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
