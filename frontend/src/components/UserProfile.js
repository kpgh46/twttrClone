import { authContext } from "../context/authContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

let UserProfile = () => {
	let { id } = useParams();
	const { currentUsers } = useContext(authContext);

	return (
		<div>
			<div>{id}</div>
			{currentUsers &&
				currentUsers.map((user) => <div>{user.username}</div>)}
			{/* <div>{userNow}</div> */}
		</div>
	);
};

export default UserProfile;
