"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("history", "customerId", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("history", "physicianId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("history", "customerId");
    await queryInterface.removeColumn("history", "physicianId");
  },
};
