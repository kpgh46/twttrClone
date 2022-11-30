import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";

const SignUp = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState(null);

	const clickSubmit = async (e) => {
		e.preventDefault();

		const user = { username, password };

		const response = await fetch("api/signup", {
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
			<form onSubmit={clickSubmit}>
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
				<button>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
