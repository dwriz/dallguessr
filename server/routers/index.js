const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  res.send("Hello! This is / route");
});

router.use(require("./auth.js"));
router.use(require("./game.js"));

module.exports = router;
