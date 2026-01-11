const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRE = "1h";
const REFRESH_TOKEN_EXPIRE = "7d";

const generateAccessToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
};
const generateRefreshToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
