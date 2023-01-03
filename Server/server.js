require("dotenv").config();

const express = require("express");
const app = express();
const tweetRoutes = require("./routes/tweets");
const userRoutes = require("./routes/auth");
const getUserRoutes = require("./routes/user");
const mongoose = require("mongoose");
const path = require("path");
const requireAuth = require("./middleware/requireAuth");

// Serve the production build of the client application
app.use(express.static(path.join(__dirname, "frontend/build")));

// For any other routes, serve the index.html file from the client/build folder
// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use(requireAuth);

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		credentials: true,
// 	})
// );

app.use(userRoutes);
app.use(tweetRoutes);
app.use(getUserRoutes);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("cats"));
// require("./passportConfig")(passport);

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
