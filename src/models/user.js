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
    }
  }
  User.init(
    {
      id: DataTypes.UUID,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      typeRole: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      geo_level_1_id: DataTypes.INTEGER,
      geo_level_2_id: DataTypes.INTEGER,
      geo_level_3_id: DataTypes.INTEGER,
      geo_level_1_name: DataTypes.STRING,
      geo_level_2_name: DataTypes.STRING,
      geo_level_3_name: DataTypes.STRING,
      geo_version: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
