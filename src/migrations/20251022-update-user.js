"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User", "roleKey", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("User", "positionKey", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("User", "genderKey", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("User", "roleKey");
    await queryInterface.removeColumn("User", "positionKey");
    await queryInterface.removeColumn("User", "genderKey");
  },
};
