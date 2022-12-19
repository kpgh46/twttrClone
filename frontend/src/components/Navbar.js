import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { useContext } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
import { Link } from "react-router-dom";

const NavigationBar = () => {
	const { removeUser, loggedInUser } = useContext(authContext);
	const { resetTweets } = useContext(TweetContext);
	const logout = () => {
		localStorage.removeItem("user");
		removeUser();
		resetTweets();
	};
	return (
		<div>
			{!loggedInUser && (
				<div>
					<Link to="/signup">Sign Up</Link>
					<Link to="/login">Log In</Link>
				</div>
			)}
			{loggedInUser && (
				<div>
					{loggedInUser.user.username}
					<button onClick={logout}>LogOut</button>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
