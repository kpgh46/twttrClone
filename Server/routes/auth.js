const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controller/authConntroller");

//Sign Up
router.post("/api/signup", signUp);

// Log In
router.post("/api/login", logIn);

module.exports = router;
