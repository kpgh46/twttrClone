const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controller/authConntroller");
const { addFollow } = require("../controller/tweetController");

//get all users

router.get("/api/users", getAllUsers);

router.patch("/api/addfollow", addFollow);

module.exports = router;
