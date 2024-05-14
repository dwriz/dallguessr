const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello! This is / route");
});

router.use(require("./auth.js"));

module.exports = router;
