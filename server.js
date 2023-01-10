require("dotenv").config();

const express = require("express");
const app = express();
const tweetRoutes = require("./routes/tweets");
const userRoutes = require("./routes/auth");
const getUserRoutes = require("./routes/user");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

// Serve the production build of the client application
app.use(express.static(path.join(__dirname, "frontend/build")));

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use(userRoutes);
app.use(tweetRoutes);
app.use(getUserRoutes);

//connecting to the db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connected to db and listening on 4000!");
		});
	})
	.catch((error) => {
		console.log(error);
	});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});
