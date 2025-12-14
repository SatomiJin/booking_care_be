"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SystemCodes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      keyMap: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      valueEn: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      valueVi: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SystemCodes");
  },
};
