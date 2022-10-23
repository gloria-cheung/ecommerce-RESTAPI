const router = require("express").Router();

//get a user
router.get("/", async (req, res, next) => {
  res.json("ok");
});

module.exports = router;
