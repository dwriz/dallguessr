'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    UserId: DataTypes.INTEGER,
    prompt1: DataTypes.STRING,
    prompt2: DataTypes.STRING,
    prompt3: DataTypes.STRING,
    finalPrompt: DataTypes.STRING,
    answer: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    accuracyRate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};