const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

//web token
const createToken = (_id) => {
	jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//sign up
const signUp = async (req, res) => {
	const { username, password } = req.body;

	//check if username already exists in database
	const exists = await User.findOne({ username });

	if (exists) {
		res.status(200).json({ message: "user already exists" });
	}

	//try to create the user in database
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			username,
			password: hashedPassword,
		});
		const token = createToken(newUser._id);
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = signUp;
