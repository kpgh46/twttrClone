const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const passport = require("../passportConfig");
const express = require("express");

const logInUser = (req, res) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send("No User Exists");
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send("successfully authenticated");
			});
		}
	})(req, res, next);
};

module.exports = logInUser;
