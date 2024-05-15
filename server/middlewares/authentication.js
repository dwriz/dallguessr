const { User } = require("../models/index.js");
const { verifyToken } = require("../helpers/jwt.js");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "InvalidToken" };

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "InvalidToken" };

    const { id } = verifyToken(token);

    const user = await User.findByPk(id);
    if (!user) throw { name: "InvalidToken" };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };
