import React from "react";

import Toast from "react-bootstrap/Toast";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaArrowCircleUp } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

import CommentPage from "./Comment";

const TweetCard = () => {
	const { loggedInUser } = useContext(authContext);
	const { tweets, getTweets, comments } = useContext(TweetContext);

	useEffect(() => {
		if (loggedInUser) {
			getTweets(loggedInUser.token);
		}
	}, []);

	const addLike = async (_id) => {
		let response = await fetch("api/addlike", {
			method: "PATCH",
			body: JSON.stringify({ _id }),
			headers: {
				Authorization: `Bearer ${loggedInUser.token}`,
				"Content-Type": "application/json",
			},
		});

		let json = response.json();

		if (!response.ok) {
			console.log(json.error);
		}
	};

	const deleteTweet = async (_id) => {
		let response = await fetch("api/deletetweet", {
			method: "DELETE",
			body: JSON.stringify({ _id }),
			headers: {
				Authorization: `Bearer ${loggedInUser.token}`,
				"Content-Type": "application/json",
			},
		});

		let json = response.json();

		if (!response.ok) {
			console.log(json.error);
		}
	};
	return (
		<div>
			{tweets &&
				tweets.map((tweet, index) => (
					<Toast
						className="container-lg mb-3"
						style={{ width: "600px" }}
					>
						<div key={tweet._id}>
							<Toast.Header closeButton={false}>
								{!tweet.author.url ? (
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
										alt="profile"
										src={tweet.author.url}
										style={{
											height: "35px",
											width: "35px",
											marginRight: "7px",
											borderRadius: "5px",
											border: ".5px solid",
										}}
									></img>
								)}
								<strong
									className="me-auto fs-5"
									style={{ color: "black" }}
								>
									{tweet.author.username}
								</strong>
								{loggedInUser.user._id === tweet.author._id ? (
									<AiFillCloseCircle
										onClick={() => deleteTweet(tweet._id)}
									></AiFillCloseCircle>
								) : (
									<div></div>
								)}
							</Toast.Header>
							<div className="d-flex flex-column mb-2 mt-2">
								<div style={{ fontSize: "17px" }}>
									{tweet.caption}
								</div>
								{tweet.photo && (
									<img
										src={tweet.photo}
										className="img-thumbnail"
										alt=""
									/>
								)}
							</div>

							<div className="container m-1">
								<div className="row">
									<div className="col-2 d-flex justify-content-end pt-1 ">
										<FaArrowCircleUp
											onClick={() => addLike(tweet._id)}
										></FaArrowCircleUp>
									</div>
									<div className="col-2 d-flex justify-content-start ps-0">
										{tweet.likes}
									</div>

									<button
										type="button"
										class="btn btn-primary btn-block shadow-none col-4 pt-0"
										style={{
											backgroundColor: "white",
											color: "black",
											border: "none",
										}}
										data-bs-toggle="collapse"
										aria-expanded="false"
										data-bs-target={[
											`#${tweet.author.username}${index}`,
										]}
									>
										Comments {<MdKeyboardArrowDown />}
									</button>

									<small className="col-4 d-flex justify-content-end pt-0">
										{formatDistanceToNow(
											new Date(tweet.createdAt),
											{ addSuffix: true }
										)}
									</small>
									<div
										id={`${tweet.author.username}${index}`}
										class="collapse"
									>
										<CommentPage
											tweetId={tweet._id}
											allComments={comments}
										/>
									</div>
								</div>
							</div>
						</div>
					</Toast>
				))}
		</div>
	);
};

export default TweetCard;
