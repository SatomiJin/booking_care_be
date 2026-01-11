// // const dotenv = require("dotenv").config();

// // let config = {
// //   development: {
// //     username: process.env.DB_USERNAME,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //     host: process.env.DB_HOST,
// //     dialect: process.env.DB_DIALECT || "postgres", // hoặc "mysql"
// //     port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
// //     logging: false,
// //     dialectOptions: {
// //       ssl:
// //         process.env.DB_SSL === "true"
// //           ? { require: true, rejectUnauthorized: false }
// //           : false,
// //     },
// //   },
// //   production: {
// //     username: process.env.DB_USERNAME,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DB_NAME,
// //     host: process.env.DB_HOST,
// //     dialect: process.env.DB_DIALECT || "postgres",
// //     port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
// //     logging: false,
// //     dialectOptions: {
// //       ssl: { require: true, rejectUnauthorized: false },
// //     },
// //   },
// // };

// // module.exports = config;
// require("dotenv").config();

// const baseConfig = {
//   dialect: "postgres",
//   logging: false,

//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// module.exports = {
//   development: {
//     ...baseConfig,
//     use_env_variable: "DATABASE_URL",
//   },
//   production: {
//     ...baseConfig,
//     use_env_variable: "DATABASE_URL",
//   },
// };
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

module.exports = { sequelize };
