const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers/userController.js");

router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/register", UserController.register);

module.exports = router;
