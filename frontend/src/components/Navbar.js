import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
import { Link } from "react-router-dom";
import { TfiThought } from "react-icons/tfi";

const NavigationBar = () => {
	const { removeUser, loggedInUser } = useContext(authContext);
	const { resetTweets } = useContext(TweetContext);
	const logout = () => {
		localStorage.removeItem("user");
		removeUser();
		resetTweets();
	};
	return (
		<Navbar>
			<Container className="border-bottom">
				<Navbar.Brand style={{ color: "rgb(66 103 178)" }} href="#">
					{" "}
					<TfiThought style={{ color: "rgb(66 103 178)" }} />{" "}
					ShareThoughts
				</Navbar.Brand>
				<Navbar.Text>
					{!loggedInUser && (
						<div>
							<Button
								style={{
									backgroundColor: "rgb(66 103 178)",
									color: "white",
									border: "1px solid rgb(66 103 178)",
									borderRadius: "5px",
								}}
								href="/signup"
							>
								Sign Up
							</Button>{" "}
							<Button
								style={{
									backgroundColor: "rgb(66 103 178)",
									color: "white",
									border: "1px solid rgb(66 103 178)",
									borderRadius: "5px",
								}}
								href="/login"
							>
								Log In
							</Button>{" "}
						</div>
					)}
					{loggedInUser && (
						<div className="d-flex flex-row">
							<div className="m-2">
								<Link to={`/profilee/${loggedInUser.user._id}`}>
									{loggedInUser.user.username}
								</Link>
							</div>
							<button
								class="btn-primary"
								style={{
									backgroundColor: "rgb(66 103 178)",
									color: "white",
									border: "1px solid rgb(66 103 178)",
									borderRadius: "5px",
								}}
								onClick={logout}
							>
								Log Out
							</button>
						</div>
					)}
				</Navbar.Text>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
