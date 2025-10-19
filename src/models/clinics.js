"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clinics.init(
    {
      id: DataTypes.UUID,
      geo_level_1_id: DataTypes.INTEGER,
      geo_level_2_id: DataTypes.INTEGER,
      geo_level_3_id: DataTypes.INTEGER,
      geo_level_1_name: DataTypes.STRING,
      geo_level_2_name: DataTypes.STRING,
      geo_level_3_name: DataTypes.STRING,
      geo_version: DataTypes.STRING,
      description: DataTypes.TEXT("medium"),
      image: DataTypes.STRING,
      name: DataTypes.TEXT("medium"),
    },
    {
      sequelize,
      modelName: "clinics",
      freezeTableName: true,
    }
  );
  return clinics;
};
