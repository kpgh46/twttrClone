import React from "react";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";

import { MdPersonAddAlt1 } from "react-icons/md";

const FollowUsers = () => {
	const { loggedInUser, setUser } = useContext(authContext);
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

				const filteredUnfollowed = unFollowedUsers.filter(
					(user) => user._id !== loggedInUser.user._id
				);

				setUsers(filteredUnfollowed);
			}
		};
		// console.log("fetch users ran");

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
			// console.log("this worked from ClickFOllow", json);
			setUser(json);
			localStorage.setItem("user", JSON.stringify(json));

			setRender((prev) => !prev);
		}
	};

	return (
		<div>
			{users &&
				users.map((user) => (
					<div className="fs-5 pt-1">
						{user.username}
						{"  "}
						<MdPersonAddAlt1
							className="pb-1"
							onClick={() => clickFollow(user._id)}
						></MdPersonAddAlt1>
					</div>
				))}
		</div>
	);
};

export default FollowUsers;
