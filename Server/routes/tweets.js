const express = require("express");
const router = express.Router();
const {
	createTweet,
	getTweets,
	addLike,
} = require("../controller/tweetController");
const requireAuth = require("../middleware/requireAuth");

// const newTweet = require("../constructors/newTweet");

router.use(requireAuth);

//get all tweets
router.get("/api/tweets", getTweets);

//get a single tweet
//

//create a new tweet
router.post("/api/tweets", createTweet);

//delete a tweet
//

router.patch("/api/addlike", addLike);

module.exports = router;
