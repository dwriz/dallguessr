const {
  createImagePrompts,
  createImageUrl,
  rateAnswer,
} = require("../helpers/openai.js");
const { cloudinary } = require("../helpers/cloudinary.js");
const { Room } = require("../models/index.js");

class GameController {
  static async createRoom(req, res, next) {
    try {
      const promptsRaw = await createImagePrompts();
      const prompts = JSON.parse(promptsRaw);

      const room = await Room.create({
        UserId: req.user.id,
        prompt1: prompts[0],
        prompt2: prompts[1],
        prompt3: prompts[2],
        finalPrompt: prompts[3],
      });

      const imageUrl = await createImageUrl(prompts[3]);

      const cloudinaryUrl = await cloudinary.uploader.upload(imageUrl, {
        folder: "dallguessr",
        public_id: room.id,
      });

      await room.update({ imgUrl: cloudinaryUrl.secure_url });

      res.status(201).json({ message: "Room successfully created" });
    } catch (error) {
      next(error);
    }
  }

  static async showDashboard(req, res, next) {
    try {
      const rooms = await Room.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  }

  static async showRoom(req, res, next) {
    try {
      const { RoomId } = req.params;

      const room = await Room.findByPk(RoomId);

      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }

  static async postAnswer(req, res, next) {
    try {
      const { RoomId } = req.params;
      const { answer } = req.body;

      const room = await Room.findByPk(RoomId);

      const accuracyRate = await rateAnswer(room.finalPrompt, req.body.answer);

      room.update({ answer, accuracyRate });

      res.status(200).json({ message: "answer successfully added, accuracy rate successfuly calculated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const { RoomId } = req.params;

      const room = await Room.findByPk(RoomId);

      await room.destroy();

      res
        .status(200)
        .json({ message: `Room ID ${RoomId} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { GameController };
