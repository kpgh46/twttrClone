const express = require("express");
const Tweet = require("../models/tweetModel");
const User = require("../models/userModel");

const getTweets = async (req, res) => {
	try {
		const currentUser = await User.findOne(req.user._id);
		console.log("From tweetController", currentUser);
		const allTweets = await Tweet.find({
			author: { $in: currentUser.follows },
		}).populate("author");

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
		const user_id = req.user._id;
		let tweet = await Tweet.create({
			caption,
			likes: 0,
			retweets: 0,
			author: user_id,
			user_id,
		});
		//if successful, send success status and json object back
		res.status(200).json(tweet);

		//if error, send failure status with error message
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const addFollow = async (req, res) => {
	//username of button
	const { username } = req.body;
	const { currentUser } = req.user._id;
	//ID of logged in user
	console.log(username, req.user._id);

	//locate user
	console.log("sup");
	User.findByIdAndUpdate(
		//doesnt like this
		req.user._id,
		{ $push: { follows: username } },
		{ new: true, upsert: true },
		(error, updatedRecord) => {
			if (error) {
				console.log(error);
			}
			res.status(200).json({ updatedRecord });
		}
	);
	//update user
};

module.exports = { createTweet, getTweets, addFollow };
