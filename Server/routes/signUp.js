const express = require("express");
const router = express.Router();
const createNewUser = require("../controller/userController");
const logInUser = require("../controller/authConntroller");

router.post("/api/signup", createNewUser);

router.post("/api/login", logInUser);

module.exports = router;
