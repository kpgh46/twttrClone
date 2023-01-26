import React from "react";
import { useLocation } from "react-router-dom";

let ProfilePage = () => {
	const location = useLocation();
	const users = location.state;
	console.log(users);
	return (
		<div>
			<div>This is the profile Page!!!</div>
			<div>{users[0].username}</div>
		</div>
	);
};

export default ProfilePage;
