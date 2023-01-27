import React from "react";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";

import { MdPersonAddAlt1 } from "react-icons/md";

const FollowUsers = () => {
	const { loggedInUser, setUser } = useContext(authContext);
	const { currentUsers, setCurrentUsers } = useContext(authContext);
	// const [render, setRender] = useState(false);

	//when "Follow" button is clicked, user is added to logged in user list of follows
	const clickFollow = async (_id) => {
		let response = await fetch("api/addfollow", {
			method: "PATCH",
			body: JSON.stringify({ _id }),
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
		}
	};

	return (
		<div>
			{currentUsers &&
				currentUsers.map((user) => (
					<div className="fs-5 pt-1">
						<Link
							to={`/profile/${user._id}`}
							style={{
								textDecoration: "none",
								color: "rgb(66 103 178",
							}}
						>
							{user.username}{" "}
						</Link>

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
