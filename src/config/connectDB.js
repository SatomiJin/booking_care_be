require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(
  config["development"].database,
  config["development"].username,
  config["development"].password,
  {
    port: config["development"].port,
    query: { raw: true },
    host: config.development.host,
    dialect: config.development.dialect,
    dialectOptions: config.development.dialectOptions,
    logging: config.development.logging,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB };
