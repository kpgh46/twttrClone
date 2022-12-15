import React from "react";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";

const FollowUsers = () => {
	const { loggedInUser } = useContext(authContext);
	const [users, setUsers] = useState(null);

	useEffect(() => {
		let fetchAllUsers = async () => {
			let response = await fetch("api/users", {
				headers: {
					Authorization: `Bearer ${loggedInUser.token}`,
				},
			});
			const json = await response.json();

			if (response.ok) {
				console.log("current users from HOME", json);
				setUsers(json);
			}
		};

		fetchAllUsers();
	}, [loggedInUser]);

	const clickFollow = async (username) => {
		let response = await fetch("api/addfollow", {
			method: "PATCH",
			body: JSON.stringify({ username }),
			headers: {
				Authorization: `Bearer ${loggedInUser.token}`,
				"Content-Type": "application/json",
			},
		});
		const json = await response.json();

		if (response.ok) {
			console.log("this worked from ClickFOllow", json);
			// setUsers(json);
		}
	};

	return (
		<div>
			{users &&
				users.allUsers.map((user) => (
					<div>
						{user.username}
						<button onClick={() => clickFollow(user._id)}>
							Follow
						</button>
					</div>
				))}
		</div>
	);
};

export default FollowUsers;
