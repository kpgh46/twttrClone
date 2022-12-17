const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

//web token
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//sign up
const signUp = async (req, res) => {
	const { username, password } = req.body;
	// console.log(username, password);

	//check if username already exists in database
	const exists = await User.findOne({ username });

	if (exists) {
		return res.status(400).json({ error: `user already exists ${exists}` });
	}

	//try to create the user in database
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			username,
			password: hashedPassword,
		});
		const token = await createToken(user._id);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const logIn = async (req, res) => {
	const { username, password } = req.body;

	//check if username already exists in database
	const user = await User.findOne({ username });

	if (!user) {
		res.status(401).json({ error: "wrong username" });
	}

	const match = bcrypt.compare(password, user.password);
	if (match) {
		try {
			const token = await createToken(user._id);
			res.status(200).json({ user, token });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.status(200).json({ allUsers });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// const getUnfollowedUsers = async (req, res) => {
// 	try{
// 	const currentUser = await User.findOne(req.user._id);

// 	}
// 	catch(error){

// 	}
// }

module.exports = { signUp, logIn, getAllUsers };
