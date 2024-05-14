const express = require("express");
const router = express.Router();

const { GameController } = require("../controllers/gameController.js");

router.post("/add-room", GameController.createRoom);

module.exports = router;
