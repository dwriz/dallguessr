function errorHandler(error, req, res, next) {
    console.log(error); // delete before prod
    switch (error.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: error.errors[0].message });
        return;
      case "EmailEmpty":
        res.status(400).json({ message: "Email is required" });
        return;
      case "PassEmpty":
        res.status(400).json({ message: "Password is required" });
        return;
      case "InvalidLogin":
        res.status(401).json({ message: "Error authentication" });
        return;
      case "InvalidToken":
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid token" });
        return;
      case "OwnerRestricted":
        res.status(403).json({ message: "Restricted to owner" });
        return;
      default:
        res.status(500).json({ message: "Internal server error" });
        return;
    }
  }
  
  module.exports = { errorHandler };