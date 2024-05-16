const express = require("express");
const router = express.Router();

const { GameController } = require("../controllers/gameController.js");

router.post("/user/:UserId/add-room", GameController.createRoom);
router.get("/dashboard", GameController.showDashboard);
router.get("/user/:UserId/rooms/:RoomId", GameController.showRoom);
router.put("/user/:UserId/rooms/:RoomId", GameController.postAnswer);
router.delete("/user/:UserId/rooms/:RoomId", GameController.deleteRoom);

module.exports = router;
