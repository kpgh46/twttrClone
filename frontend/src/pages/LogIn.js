import React from "react";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import Navbar from "../components/Navbar";

const LogIn = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState("");
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
			setError(json.error);
			console.log(error);
		}
		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(json));
			setUser(json);
		}
	};

	useEffect(() => {
		if (!error) {
			return;
		}
		setTimeout(() => {
			setError(null);
		}, 3000);
	}, [error]);

	return (
		<div className="container w-75">
			<Navbar />
			<form
				className="container w-50 border rounded-2 mt-3"
				onSubmit={clickLogIn}
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
					<div id="emailHelp" class="form-text"></div>
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
				{error && <div style={{ color: "red" }}>{error}</div>}
			</form>
		</div>
	);
};

export default LogIn;
