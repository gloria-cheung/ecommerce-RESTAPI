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

//update product
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing productID");
  }

  // set new:true in order to return back the updated version
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
