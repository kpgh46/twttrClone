const express = require("express");
const router = express.Router();
const signUp = require("../controller/authConntroller");

//Sign Up
router.post("/api/signup", signUp);

// Log In
// router.post("/api/login", logInUser);

module.exports = router;
