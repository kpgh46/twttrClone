const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controller/authConntroller");

//get all users

router.get("/api/users", getAllUsers);

module.exports = router;
