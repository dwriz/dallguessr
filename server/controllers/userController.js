class UserController {
  static async login(req, res) {
    try {
      res.send("This is /login route");
    } catch (error) {
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      res.send("This is /register route");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = { UserController };
