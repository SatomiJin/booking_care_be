"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Bookings", "typeStatus", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Bookings", "keyMap", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("Bookings", "statusId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Bookings", "typeStatus");
    await queryInterface.removeColumn("Bookings", "keyMap");
    await queryInterface.addColumn("Bookings", "statusId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
