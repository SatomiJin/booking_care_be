"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    static associate(models) {
      // define association here (nếu cần)
    }
  }

  Bookings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true, // ✅ dòng quan trọng nhất
      },
      statusKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      physicianId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "Bookings",
      freezeTableName: true,
      timestamps: true, // ✅ nên bật để Sequelize tự thêm createdAt, updatedAt
    }
  );

  return Bookings;
};
