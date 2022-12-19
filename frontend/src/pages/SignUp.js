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
			<form
				className="container w-50 border rounded-2 mt-3"
				onSubmit={clickSubmit}
			>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">
						Username
					</label>
					<input
						type="text"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => setUserName(e.target.value)}
					></input>
					<div id="emailHelp" class="form-text">
						Could be an error message here
					</div>
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">
						Password
					</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>

				<button type="submit" class="btn btn-primary mb-2">
					Submit
				</button>
			</form>
			{error && <div>{error.error}</div>}
			{loggedInUser && <div>{loggedInUser.user.username}</div>}
		</div>
	);
};

export default SignUp;
