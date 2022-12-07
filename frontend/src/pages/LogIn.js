import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";

const LogIn = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState(null);

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
			setError(json.error);
		}
		if (response.ok) {
			console.log("newworkout added", json);
		}
	};

	return (
		<div>
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
			</form>
		</div>
	);
};

export default LogIn;
