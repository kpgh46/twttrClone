import React from "react";

import { useContext } from "react";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { removeUser, loggedInUser } = useContext(authContext);
	const logout = () => {
		localStorage.removeItem("user");
		removeUser();
		console.log(loggedInUser);
	};
	return (
		<div>
			{!loggedInUser && (
				<div>
					<Link to="/signup">Sign Up</Link>
					<Link to="/login">Log In</Link>
				</div>
			)}
			{loggedInUser && (
				<div>
					{loggedInUser.username}
					<button onClick={logout}>LogOut</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
