const userService = require("../services/userServices.js");
const codeMessageError = require("../../codeMessageError.js");
//user
const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

const getListUsers = async (req, res) => {
  try {
    const response = await userService.getListUsers(req.query);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

const getDetailUser = async (req, res) => {
  // Implementation for getting user details
  try {
    const response = await userService.getDetailUser(req.params.id);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const response = await userService.updateUser(req.body);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const response = await userService.deleteUser(req.query.id);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    return res.status(response.code || 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createUser,
  getListUsers,
  getDetailUser,
  updateUser,
  deleteUser,

  loginUser,
};
