"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("(UUID())"), // ✅ Cách an toàn cho MariaDB/MySQL
        allowNull: false,
        primaryKey: true,
      },
      statusKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      physicianId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      timeType: {
        type: DataTypes.STRING, // ⚠️ Cậu dùng STRING trong model nên giữ nguyên
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
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Bookings");
  },
};
