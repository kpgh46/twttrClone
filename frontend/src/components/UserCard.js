import React from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { BsPersonBoundingBox } from "react-icons/bs";

let UserCard = (props) => {
	return (
		<div className="row">
			<Toast className="container-lg mb-3" style={{ width: "600px" }}>
				<div className="row">
					<div className="col-6 mt-5 mb-5">
						{!props.user.url ? (
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
								src={props.user.url}
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
							<h2>{props.user.username}</h2>
							<div>
								<em>
									"This is my favorite quote that will be
									added to the user model for this project!"
								</em>
							</div>
							{/* <h6 className="mt-2">
								Following: {props.following}{" "}
							</h6>
							<h6>Followers: {props.followers}</h6> */}
							<Button
								style={{
									marginTop: "10px",
									width: "95%",
									backgroundColor: "rgb(66 103 178)",
									color: "white",
									border: "1px solid rgb(66 103 178)",
									borderRadius: "5px",
								}}
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

export default UserCard;
