"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("User");
  },
};
