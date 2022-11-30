const mongoose = require("mongoose");
const User = require("../models/userModel");

const createNewUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		let newUser = await User.create({ username, password });
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = createNewUser;
