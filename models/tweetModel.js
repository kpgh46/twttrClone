const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
	{
		caption: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
		},
		likes: {
			type: Number,
		},
		retweets: {
			type: Number,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		user_id: {
			type: String,
			required: true,
		},
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);
