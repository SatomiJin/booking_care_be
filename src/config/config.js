require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  query: { raw: true },

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Supabase DB connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to Supabase DB:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
