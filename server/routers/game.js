const express = require("express");
const router = express.Router();

const { GameController } = require("../controllers/gameController.js");

router.post("/user/:UserId/add-room", GameController.createRoom);
router.get("/user/:UserId/rooms", GameController.dashboard);

module.exports = router;
