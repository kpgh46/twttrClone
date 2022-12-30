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
							<Button style={{ color: "white" }} href="/signup">
								Sign Up
							</Button>{" "}
							<Button style={{ color: "white" }} href="/login">
								Log In
							</Button>{" "}
						</div>
					)}
					{loggedInUser && (
						<div className="d-flex flex-row">
							<div className="m-2">
								{loggedInUser.user.username}
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
								LogOut
							</button>
						</div>
					)}
				</Navbar.Text>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
