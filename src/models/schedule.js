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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      currentQuantitySchedule: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxQuantitySchedule: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      timeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
