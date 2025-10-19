"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedules.init(
    {
      id: DataTypes.UUID,
      currentQuantitySchedule: DataTypes.INTEGER,
      maxQuantitySchedule: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "schedules",
      freezeTableName: true,
    }
  );
  return Schedules;
};
