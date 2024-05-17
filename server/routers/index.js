const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication.js");

router.post("/", async (req, res) => {
  res.send("Hello! This is / route");
});

router.use(require("./auth.js"));

router.use(authentication);

router.use(require("./game.js"));

module.exports = router;
