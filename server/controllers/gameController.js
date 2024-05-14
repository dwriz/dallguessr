const { openAI } = require("../helpers/openai.js");

class GameController {
  static async createRoom(req, res, next) {
    try {
      let responseOpenAI = await openAI();
      res.send(responseOpenAI)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { GameController };
