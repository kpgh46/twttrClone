import React from "react";
import { useState, useContext } from "react";
import { authContext } from "../context/authContext";
import Navbar from "../components/Navbar";

const LogIn = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState(null);
	let { loggedInUser, setUser } = useContext(authContext);

	const clickLogIn = async (e) => {
		e.preventDefault();

		const user = { username, password };

		const response = await fetch("api/login", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json);
		}
		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(json));
			setUser(json);
			console.log("We should be logged in", loggedInUser);
		}
	};

	return (
		<div>
			<Navbar />
			<div>Please Log In</div>
			<form onSubmit={clickLogIn}>
				<label>Username</label>
				<input
					name="username"
					placeholder="username"
					type="text"
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>Password</label>
				<input
					name="password"
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button>Log In</button>
				{error && <div>{error.message}</div>}
				{loggedInUser && <div>{loggedInUser.user.username}</div>}
			</form>
		</div>
	);
};

export default LogIn;
