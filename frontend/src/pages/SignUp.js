import React from "react";
import { useState, useContext } from "react";
import { authContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";

const SignUp = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState(null);
	let { loggedInUser, setUser } = useContext(authContext);

	const clickSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		//create object for username and password
		const user = { username, password };

		//post request to api/signup.  sends stringified JSON
		const response = await fetch("api/signup", {
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
			console.log("from SignUp", loggedInUser);
		}
	};

	return (
		<div>
			<Navbar />
			<div>Please Sign Up</div>
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
			{error && <div>{error.error}</div>}
			{loggedInUser && <div>{loggedInUser.user.username}</div>}
		</div>
	);
};

export default SignUp;
