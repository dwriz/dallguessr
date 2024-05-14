const { createImagePrompts, createImageUrl } = require("../helpers/openai.js");

class GameController {
  static async createRoom(req, res, next) {
    try {
      let prompts = await createImagePrompts();
      console.log(prompts);
      let imageUrl = await createImageUrl(prompts[3]);
      console.log(imageUrl);
      res.send(imageUrl);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { GameController };
