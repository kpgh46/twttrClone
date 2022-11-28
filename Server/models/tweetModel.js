const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
	{
		caption: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
		},
		retweets: {
			type: Number,
		},
		author: {
			type: String,
			required: true,
		},
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);
