const router = require("express").Router();
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    if (req.body.password) {
      // if there's password in body, need to hash again before saving
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // set new:true so that the user is returned from model
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...everythingButPassword } = user._doc;
    res.status(200).json(everythingButPassword);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//delete user
router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get user (only admin has access)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(403).json("user not found");
    }
    
    const { password, ...everythingButPassword } = user._doc;
    res.status(200).json(everythingButPassword);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
