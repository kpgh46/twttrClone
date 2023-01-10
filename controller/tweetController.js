const express = require("express");
const Tweet = require("../models/tweetModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

const getTweets = async (req, res) => {
	try {
		const currentUser = await User.findOne(req.user._id);
		const userFollowerTweets = await Tweet.find({
			author: { $in: currentUser.follows },
		})
			.sort({ createdAt: -1 })
			.populate("author");

		const userTweets = await Tweet.find({ author: req.user._id })
			.sort({ createdAt: -1 })
			.populate("author");

		const allComments = await Comment.find({}).populate("author");

		const allTweets = [...userTweets, ...userFollowerTweets];
		const sortedAllTweets = allTweets.sort((b, a) => {
			if (a.createdAt > b.createdAt) {
				return 1;
			} else {
				return -1;
			}
		});

		res.status(200).json({
			allTweets: sortedAllTweets,
			allComments: allComments,
		});
	} catch (error) {
		return res.status(400).error(error.message);
	}
};

const createTweet = async (req, res) => {
	// get variables from body of request
	const { caption, photo, likes, retweets, author } = req.body;

	// async function to create a Tweet in db
	try {
		const user_id = req.user._id;
		let tweet = await Tweet.create({
			caption,
			photo,
			likes: 0,
			retweets: 0,
			author: user_id,
			user_id,
		});
		console.log(tweet);
		//if successful, send success status and json object back
		res.status(200).json(tweet);

		//if error, send failure status with error message
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const addLike = async (req, res) => {
	const { _id } = req.body;
	try {
		const tweet = await Tweet.updateOne(
			{ _id: _id },
			{ $inc: { likes: 1 } }
		);

		const currentUser = await User.findOne(req.user._id);

		const allTweets = await Tweet.find({
			author: { $in: currentUser.follows },
		}).populate("author");

		res.status(200).json(allTweets);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteTweet = async (req, res) => {
	const { _id } = req.body;
	try {
		await Tweet.deleteOne({ _id });
		const currentUser = await User.findOne(req.user._id);
		const allTweets = await Tweet.find({
			author: { $in: currentUser.follows },
		}).populate("author");

		res.status(200).json(allTweets);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const addComment = async (req, res) => {
	const { text } = req.body;

	try {
		const currentUser = await User.findOne(req.user._id);
		const currentTweet = await Tweet.findById(req.body.tweetId);

		const newComment = await Comment.create({
			tweet: req.body.tweetId,
			text: req.body.text,
			author: req.user._id,
		});

		res.status(200).json(newComment);
		console.log(newComment);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { createTweet, getTweets, addLike, deleteTweet, addComment };
