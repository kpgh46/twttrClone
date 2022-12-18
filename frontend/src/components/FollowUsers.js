import React from "react";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";
import { AiOutlineUserAdd } from "react-icons/ai";

const FollowUsers = () => {
	const { loggedInUser } = useContext(authContext);
	const [users, setUsers] = useState(null);
	const [render, setRender] = useState(false);

	const findUnqiue = (arr1, arr2) => {
		let empty = [];

		arr2.forEach((item) => {
			if (!arr1.includes(item._id)) {
				empty.push(item);
			}
		});
		return empty;
	};

	//fetches all users in database.
	useEffect(() => {
		let fetchAllUsers = async () => {
			let response = await fetch("api/users", {
				headers: {
					Authorization: `Bearer ${loggedInUser.token}`,
				},
			});
			const json = await response.json();

			if (response.ok) {
				let loggedInFollows = loggedInUser.user.follows;
				let allUsers = json.allUsers;
				const unFollowedUsers = findUnqiue(loggedInFollows, allUsers);

				// console.log(unFollowedUsers);
				console.log("unfollowed users:", unFollowedUsers);
				setUsers(unFollowedUsers);
			}
		};
		console.log("fetch users ran");

		fetchAllUsers();
	}, [render]);

	//when "Follow" button is clicked, user is added to logged in user list of follows
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
			setRender((prev) => !prev);
		}
	};

	return (
		<div>
			{users &&
				users.map((user) => (
					<div>
						{user.username}
						<AiOutlineUserAdd
							onClick={() => clickFollow(user._id)}
						></AiOutlineUserAdd>
					</div>
				))}
		</div>
	);
};

export default FollowUsers;
