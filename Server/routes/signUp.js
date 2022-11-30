const express = require("express");
const router = express.Router();
const createNewUser = require("../controller/userController");

router.post("/api/signup", createNewUser);

module.exports = router;
