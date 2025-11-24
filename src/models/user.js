"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.SystemCodes, {
        foreignKey: "roleKey",
        targetKey: "keyMap",
        as: "roleData",
      });
      User.belongsTo(models.SystemCodes, {
        foreignKey: "positionKey",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.SystemCodes, {
        foreignKey: "genderKey",
        targetKey: "keyMap",
        as: "genderData",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      roleKey: {
        type: DataTypes.STRING,
      },
      positionKey: {
        type: DataTypes.STRING,
      },
      genderKey: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
