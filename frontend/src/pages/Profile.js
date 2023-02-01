import React from "react";
import NavigationBar from "../components/Navbar";
import { json, useParams } from "react-router-dom";
import { authContext } from "../context/authContext";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

import { useContext } from "react";

import { BsPersonBoundingBox } from "react-icons/bs";

let ProfilePage = () => {
	const { currentUsers } = useContext(authContext);
	const { loggedInUser, setUser } = useContext(authContext);
	const { id } = useParams();

	console.log(id);
	let user = currentUsers.filter((person) => person._id === id);
	let following = user[0].follows.length;

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

	let getFollowers = (objectArray, id) => {
		let followsArray = 0;

		objectArray.forEach((arr) => {
			if (arr.follows.includes(id)) {
				followsArray++;
			}
		});

		return followsArray;
	};

	let followers = getFollowers(currentUsers, id);

	return (
		<div className="row">
			<NavigationBar />
			<Toast className="container-lg mb-3" style={{ width: "600px" }}>
				<div className="row">
					<div className="col-6 mt-5 mb-5">
						{!user[0].url ? (
							<BsPersonBoundingBox
								style={{
									height: "165px",
									width: "165px",
									paddingRight: "9px",
									color: "black",
								}}
							/>
						) : (
							<img
								alt="profile"
								src={user[0].url}
								style={{
									height: "165px",
									width: "165px",
									marginRight: "7px",
									borderRadius: "5px",
									border: ".5px solid",
								}}
							></img>
						)}
					</div>

					<div className="d-flex align-items-start  col-6 mt-5 mb-5">
						<div className="row">
							<h2>{user[0].username}</h2>
							<div>
								<em>
									"This is my favorite quote that will be
									added to the user model for this project!"
								</em>
							</div>
							<h6 className="mt-2">Following: {following} </h6>
							<h6>Followers: {followers}</h6>
							<Button
								style={{
									marginTop: "10px",
									width: "95%",
									backgroundColor: "rgb(66 103 178)",
									color: "white",
									border: "1px solid rgb(66 103 178)",
									borderRadius: "5px",
								}}
								onClick={() => clickFollow(user[0]._id)}
							>
								Follow
							</Button>
						</div>
					</div>
				</div>
			</Toast>
		</div>
	);
};

export default ProfilePage;
