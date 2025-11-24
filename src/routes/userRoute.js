const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
router.post("/users", userControllers.createUser);
router.get("/users", userControllers.getListUsers);
router.get("/users/:id", userControllers.getDetailUser);
module.exports = router;
