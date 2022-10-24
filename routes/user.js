const router = require("express").Router();
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken");
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

module.exports = router;
