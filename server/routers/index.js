const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication.js");

router.use(require("./auth.js"));

router.use(authentication);

router.use(require("./game.js"));

module.exports = router;
