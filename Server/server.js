require("dotenv").config();

const express = require("express");
const app = express();
const allRoutes = require("./routes/tweets");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
app.use(allRoutes);

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
