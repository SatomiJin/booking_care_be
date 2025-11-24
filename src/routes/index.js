const express = require("express");
const userRoute = require("./userRoute");
const router = express.Router();

let initWebRoutes = (app) => {
  //   app.use("/", router);
  app.use("/api/users", userRoute);
};

module.exports = initWebRoutes;
