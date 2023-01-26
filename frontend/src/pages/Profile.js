import React from "react";
import NavigationBar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

import { AiFillCloseCircle } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

let ProfilePage = () => {
	const location = useLocation();
	const users = location.state;
	console.log(users);
	const { id } = useParams();
	let user = users.filter((person) => person._id === id);
	let following = user[0].follows.length;

	let getFollowers = (objectArray, id) => {
		let followsArray = 0;

		objectArray.forEach((arr) => {
			if (arr.follows.includes(id)) {
				followsArray++;
			}
		});

		return followsArray;
	};

	let followers = getFollowers(users, id);

	return (
		<div className="row">
			<NavigationBar />
			<Toast className="container-lg mb-3" style={{ width: "600px" }}>
				<div className="row">
					<div className="col-6 mt-5 mb-5">
						{!user[0].url ? (
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
								src={user[0].url}
								style={{
									height: "185px",
									width: "185px",
									marginRight: "7px",
									borderRadius: "5px",
									border: ".5px solid",
								}}
							></img>
						)}
					</div>

					<div className="d-flex align-items-start border col-6 mt-5 mb-5">
						<div className="row">
							<div className="border">{user[0].username}</div>
							<div className="border">
								"This is my favorite quote that will be added to
								the user model for this project!"
							</div>
							<div>Following: {following} </div>
							<div>Followers: {followers}</div>
							<button>FOLLOW</button>
						</div>
					</div>
				</div>
			</Toast>
		</div>
	);
};

export default ProfilePage;
