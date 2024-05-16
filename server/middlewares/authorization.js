const { Room } = require("../models/index.js");

async function authorization(req, res, next) {
  try {
    const room = await Room.findByPk(req.params.RoomId);

    if (!room) throw { name: "NotFound" };

    if (room.UserId !== req.user.id) throw { name: "OwnerRestricted" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorization };
