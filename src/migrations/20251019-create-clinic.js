"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clinics", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      geo_level_1_id: {
        type: Sequelize.INTEGER,
      },
      geo_level_2_id: {
        type: Sequelize.INTEGER,
      },
      geo_level_3_id: {
        type: Sequelize.INTEGER,
      },
      geo_level_1_name: {
        type: Sequelize.STRING,
      },
      geo_level_2_name: {
        type: Sequelize.STRING,
      },
      geo_level_3_name: {
        type: Sequelize.STRING,
      },
      geo_version: {
        type: Sequelize.STRING,
        defaultValue: "v1",
      },
      image: {
        type: DataTypes.TEXT("medium"),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Clinics");
  },
};
