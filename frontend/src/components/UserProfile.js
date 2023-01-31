import React, { useEffect } from "react";
import { authContext } from "../context/authContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

let UserProfile = () => {
	let { id } = useParams();
	const { currentUsers, setCurrentUsers } = useContext(authContext);
	const { runRender } = useContext(authContext);

	useEffect(() => {
		runRender();
	}, []);

	console.log(currentUsers[0].username);

	return (
		<div>
			<div>{id}</div>
			{currentUsers &&
				currentUsers.map((user) => <div>{user.username}</div>)}
		</div>
	);
};

export default UserProfile;
