import React from "react";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";

const SignUp = () => {
	let [username, setUserName] = useState("");
	let [password, setPassword] = useState("");
	let [url, setUrl] = useState("");
	let [error, setError] = useState(null);
	let { loggedInUser, setUser } = useContext(authContext);

	const clickSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		//create object for username and password
		const user = { username, password, url };

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
						onChange={(e) => setPassword(e.target.value)}
						required
					></input>
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">
						URL for profile (Optional)
					</label>
					<input
						type="text"
						class="form-control"
						onChange={(e) => setUrl(e.target.value)}
					></input>
				</div>

				<button
					type="submit"
					class="btn btn-primary mb-2"
					style={{
						backgroundColor: "rgb(66 103 178)",
						color: "white",
						border: "1px solid rgb(66 103 178)",
						borderRadius: "5px",
					}}
				>
					Submit
				</button>
				{error && <div style={{ color: "red" }}>{error.error}</div>}
				{loggedInUser && <div>{loggedInUser.user.username}</div>}
			</form>
		</div>
	);
};

export default SignUp;
