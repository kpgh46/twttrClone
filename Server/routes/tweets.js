const express = require("express");
const router = express.Router();
const { createTweet, getTweets } = require("../controller/tweetController");

// const newTweet = require("../constructors/newTweet");

//get all tweets
router.get("/", getTweets);

//get a single tweet
//

//create a new tweet
router.post("/", createTweet);

//delete a tweet
//

module.exports = router;
