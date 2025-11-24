"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SystemCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SystemCodes.hasMany(models.User, {
        foreignKey: "roleKey",
        sourceKey: "keyMap",
      });
      SystemCodes.hasMany(models.User, {
        foreignKey: "positionKey",
        sourceKey: "keyMap",
      });
      SystemCodes.hasMany(models.User, {
        foreignKey: "genderKey",
        sourceKey: "keyMap",
      });
    }
  }
  SystemCodes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyMap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valueEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valueVi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SystemCodes",
      freezeTableName: true,
    }
  );
  return SystemCodes;
};
