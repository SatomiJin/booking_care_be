"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Enable UUID generator
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`
    );

    await queryInterface.createTable("schedules", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      currentQuantitySchedule: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      maxQuantitySchedule: {
        type: Sequelize.INTEGER,
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

      doctorId: {
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
    await queryInterface.dropTable("schedules");
  },
};
