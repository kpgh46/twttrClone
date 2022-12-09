import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext";

const Navbar = () => {
	const { removeUser } = useContext(authContext);
	const logout = () => {
		localStorage.removeItem("user");
		removeUser();
	};
	return (
		<div>
			<button onClick={logout}>LogOut</button>
		</div>
	);
};

export default Navbar;
