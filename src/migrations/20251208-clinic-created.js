"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Bật extension pgcrypto để tạo UUID
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`
    );

    await queryInterface.createTable("Clinics", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.TEXT, // TEXT("medium") của MySQL -> TEXT trong PostgreSQL
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
        defaultValue: "GEO_V1",
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      address: {
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
    await queryInterface.dropTable("Clinics");
  },
};
