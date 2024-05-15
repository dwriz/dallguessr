const { createImagePrompts, createImageUrl } = require("../helpers/openai.js");
const { cloudinary } = require("../helpers/cloudinary.js");
const { Room } = require("../models/index.js");

class GameController {
  static async createRoom(req, res, next) {
    try {
      const promptsRaw = await createImagePrompts();

      console.log(promptsRaw);
      console.log("======= raw prompts =======");

      const prompts = JSON.parse(promptsRaw);
      
      console.log(prompts);
      console.log("======= processed prompts =======");

      const room = await Room.create({
        UserId: req.params.id,
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

      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { GameController };
