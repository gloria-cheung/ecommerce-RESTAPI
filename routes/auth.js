const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json("missing credentials");
  }

  try {
    //hash password, then create user and save to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const { password, ...everythingButPassword } = savedUser._doc;
    res.status(201).json(everythingButPassword);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// login
router.post("/login", async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json("missing credentials");
  }

  try {
    // check if user exist and then compare password with hashed version
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("username does not exist");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json("password incorrect");
    }

    // create jwt accesstoken that expires in 3 days
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    // remove password and add accessToken to response back to client
    const { password, ...everythingButPassword } = user._doc;

    res
      .status(200)
      .json({ ...everythingButPassword, accessToken: accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
