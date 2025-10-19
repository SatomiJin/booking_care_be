const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/connectDB");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
