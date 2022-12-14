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

	return (
		<div>
			{users &&
				users.allUsers.map((user) => (
					<div>
						{user.username}
						<button>Follow</button>
					</div>
				))}
		</div>
	);
};

export default FollowUsers;
