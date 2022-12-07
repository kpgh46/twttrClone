const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const passport = require("../passportConfig");
const express = require("express");

const createNewUser = async (req, res) => {
	const { username, password } = req.body;

	let newUser = await User.exists({ username });

	if (newUser) {
		return res.json({ mssg: "this user already exists" });
	}

	try {
		let hashedPassword = await bcrypt.hash(req.body.password, 10);
		let createUser = await User.create({
			username,
			password: hashedPassword,
		});
		res.status(200).json(createUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = createNewUser;
