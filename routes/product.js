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

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing productID");
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get product
router.get("/:id", async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json("missing productID");
  }

  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get all products
router.get("/", async (req, res, next) => {
  // can have 1 query, both or none
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  let products;
  
  try {
    if (queryNew && queryCategory) {
      products = await Product.find({
        categories: { $in: [queryCategory] },
      })
        .sort({ createdAt: "desc" })
        .limit(5);
    } else if (queryNew) {
      products = await Product.find().sort({ createdAt: "desc" }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({ categories: { $in: [queryCategory] } });
    } else {
      products = await Product.find();
    }
    
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
