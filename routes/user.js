const express = require("express");
const router = express.Router();
const { getAllUsers, addFollow } = require("../controller/authConntroller");

//get all users

router.get("/api/users", getAllUsers);

router.patch("/api/addfollow", addFollow);

module.exports = router;
