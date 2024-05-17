"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Room.init(
    {
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User ID is required",
          },
        },
      },
      prompt1: DataTypes.STRING,
      prompt2: DataTypes.STRING,
      prompt3: DataTypes.STRING,
      finalPrompt: DataTypes.STRING,
      answer: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      accuracyRate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
