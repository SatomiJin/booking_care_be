"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // PostgreSQL compatible
        allowNull: false,
        primaryKey: true,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      geo_level_1_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      geo_level_2_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      geo_level_3_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      geo_level_1_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      geo_level_2_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      geo_level_3_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      geo_version: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      roleKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      positionKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      genderKey: {
        type: Sequelize.STRING,
        allowNull: true,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
