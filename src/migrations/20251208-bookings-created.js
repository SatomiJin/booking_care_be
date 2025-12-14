"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Bật extension pgcrypto để hỗ trợ gen_random_uuid()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`
    );

    await queryInterface.createTable("Bookings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"), // UUID v4 PG
        allowNull: false,
        primaryKey: true,
      },

      statusKey: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      physicianId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      customerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      timeType: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Bookings");
  },
};
