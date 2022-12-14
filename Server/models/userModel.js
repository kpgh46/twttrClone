const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	url: {
		type: String,
	},
	follows: {
		type: Array,
	},
});

module.exports = mongoose.model("User", User);

// type: [{ type: Schema.Types.ObjectId, ref: "User" }],
