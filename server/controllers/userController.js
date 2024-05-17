const { User } = require("../models/index.js");
const { comparePassword } = require("../helpers/bcrypt.js");
const { createToken } = require("../helpers/jwt.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: toString(Math.random() * 10000),
        },
      });

      const token = createToken({ id: user.id });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const user = await User.create({
        email: email,
        password: password,
        username: username,
      });

      res.status(201).json({ message: "Account successfully created" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };
