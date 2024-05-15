const express = require("express");
const router = express.Router();

const { GameController } = require("../controllers/gameController.js");

router.post("/user/:id/add-room", GameController.createRoom);

module.exports = router;
