"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init(
    {
      id: DataTypes.UUID,
      typeStatus: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      physicianId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      date: DataTypes.DATE,
      timeType: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bookings",
      freezeTableName: true,
    }
  );
  return Bookings;
};
