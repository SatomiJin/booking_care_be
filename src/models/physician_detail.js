"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class physician_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  physician_detail.init(
    {
      id: DataTypes.UUID,
      physicianId: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "physician_detail",
      freezeTableName: true,
    }
  );
  return physician_detail;
};
