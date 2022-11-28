const express = require("express");
const Tweet = require("../models/tweetModel");

const getTweets = async (req, res) => {
	try {
		let allTweets = await Tweet.find({});
		res.status(200).json(allTweets);
	} catch (error) {
		res.status(400).error(error.message);
	}
};

const createTweet = async (req, res) => {
	// get variables from body of request
	const { caption, likes, retweets, author } = req.body;

	// async function to create a Tweet in db
	try {
		let tweet = await Tweet.create({ caption, likes, retweets, author });
		//if successful, send success status and json object back
		res.status(200).json(tweet);

		//if error, send failure status with error message
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { createTweet, getTweets };
