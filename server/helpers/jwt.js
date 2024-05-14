const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, process.env.JSONWEBTOKEN_SECRET, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
}

module.exports = { createToken, verifyToken };
