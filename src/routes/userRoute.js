const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
//users
router.post("/users", userControllers.createUser);
router.get("/users", userControllers.getListUsers);
router.get("/users/:id", userControllers.getDetailUser);
router.put("/users/update", userControllers.updateUser);
router.delete("/users/delete", userControllers.deleteUser);

module.exports = router;
