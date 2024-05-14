const { User } = require("../models/index.js");
const { comparePassword } = require("../helpers/bcrypt.js");
const { createToken } = require("../helpers/jwt.js");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailEmpty" };
      if (!password) throw { name: "PassEmpty" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidLogin" };

      const checkUser = comparePassword(password, user.password);
      if (!checkUser) throw { name: "InvalidLogin" };

      const token = createToken({ id: user.id });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res) {
    try {
      res.send("This is /register route");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };
