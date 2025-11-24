"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Clinics extends Model {
    static associate(models) {
      // Nếu sau này muốn liên kết, ví dụ:
      // Clinics.hasMany(models.Bookings, { foreignKey: "clinicId" });
    }
  }

  Clinics.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true, // ✅ Bắt buộc để tránh lỗi Sequelize tự thêm id
      },
      name: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geo_level_1_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      geo_level_2_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      geo_level_3_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      geo_level_1_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geo_level_2_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geo_level_3_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geo_version: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "GEO_V1",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Clinics",
      freezeTableName: true,
      timestamps: true, // ✅ Tự động thêm createdAt, updatedAt
    }
  );

  return Clinics;
};
