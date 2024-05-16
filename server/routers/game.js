const express = require("express");
const router = express.Router();

const { GameController } = require("../controllers/gameController.js");

router.post("/room/add", GameController.createRoom);
router.get("/room/all", GameController.showDashboard);

const { authorization } = require("../middlewares/authorization.js");

router.get("/room/:RoomId", authorization, GameController.showRoom);
router.put("/room/:RoomId", authorization, GameController.postAnswer);
router.delete("/room/:RoomId", authorization, GameController.deleteRoom);

module.exports = router;
