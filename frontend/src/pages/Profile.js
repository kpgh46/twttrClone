import React from "react";
import NavigationBar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

import { AiFillCloseCircle } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

let ProfilePage = () => {
	const location = useLocation();
	const users = location.state;
	let user = users[0];
	console.log(users);
	return (
		<div className="row">
			<NavigationBar />
			<Toast className="container-lg mb-3" style={{ width: "600px" }}>
				{!user.url ? (
					<BsPersonBoundingBox
						style={{
							height: "30px",
							width: "35px",
							paddingRight: "9px",
							color: "black",
						}}
					/>
				) : (
					<img
						alt="profile image"
						src={user.url}
						style={{
							height: "135px",
							width: "135px",
							marginRight: "7px",
							borderRadius: "5px",
							border: ".5px solid",
						}}
					></img>
				)}
				<div>{user.username}</div>
				<br></br>
				<br></br>
			</Toast>
		</div>
	);
};

export default ProfilePage;
