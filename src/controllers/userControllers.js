const userService = require("../services/userServices.js");
const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getListUsers = async (req, res) => {
  try {
    const response = await userService.getListUsers(req.query);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getDetailUser = async (req, res) => {
  // Implementation for getting user details
  try {
    const response = await userService.getDetailUser(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  createUser,
  getListUsers,
  getDetailUser,
};
