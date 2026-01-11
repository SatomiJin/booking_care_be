const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
//users
router.post("/users", userControllers.createUser);
router.get("/users", userControllers.getListUsers);
router.get("/users/:id", userControllers.getDetailUser);
router.put("/users", userControllers.updateUser);
router.delete("/users", userControllers.deleteUser);

//login
router.post("/users/login", userControllers.loginUser);

module.exports = router;
