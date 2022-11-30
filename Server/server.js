require("dotenv").config();

const express = require("express");
const app = express();
const tweetRoutes = require("./routes/tweets");
const userRoutes = require("./routes/signUp");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(tweetRoutes);
app.use(userRoutes);

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connected to db and listening on 4000");
		});
	})
	.catch((error) => {
		console.log(error);
	});

// app.listen(4000, () => {
// 	console.log("running on port 4000");
// });
