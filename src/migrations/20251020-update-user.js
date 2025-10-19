"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User", "typeRole", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("User", "keyMap", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("User", "role");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("User", "typeRole");
    await queryInterface.removeColumn("User", "keyMap");
    await queryInterface.addColumn("User", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
