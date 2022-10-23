const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json("missing credentials");
  }

  try {
    //hash password, then create user and save to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
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

    // do not include password in response when send back to client
    const { password, ...everythingButPassword } = user._doc;

    res.status(200).json(everythingButPassword);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
