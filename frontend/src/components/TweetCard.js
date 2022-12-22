import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FaArrowCircleUp } from "react-icons/fa";
import ToastHeader from "react-bootstrap/ToastHeader";
import CloseButton from "react-bootstrap/CloseButton";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import CommentPage from "./CommentPage";
import { Link } from "react-router-dom";

const TweetCard = () => {
	const { loggedInUser } = useContext(authContext);
	const { tweets, setTweets } = useContext(TweetContext);
	const [allComments, setAllComments] = useState(null);
	const [render, setRender] = useState(true);

	useEffect(() => {
		const fetchTweets = async () => {
			let response = await fetch("api/tweets", {
				headers: {
					Authorization: `Bearer ${loggedInUser.token}`,
				},
			});
			let json = await response.json();

			if (response.ok) {
				setTweets(json.allTweets);
				setAllComments(json.allComments);
			}
		};

		if (loggedInUser) {
			fetchTweets();
			// console.log(loggedInUser);
			// setRender((render) => !render);
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
		const json = await response.json();

		if (response.ok) {
			// console.log("this worked from addLike", json);
			// setUsers(json);
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
		const json = await response.json();

		if (response.ok) {
			// console.log("this worked from DeleteTweet", json);
		}
		// console.log("sup");
	};
	return (
		<div>
			{tweets &&
				tweets.map((tweet, index) => (
					<Toast className="container mb-3">
						<div key={tweet._id}>
							<Toast.Header closeButton={false}>
								{!tweet.author.url ? (
									<BsPersonBoundingBox
										style={{
											height: "30px",
											width: "35px",
											paddingRight: "9px",
										}}
									/>
								) : (
									<img
										src={tweet.author.url}
										style={{
											height: "30px",
											width: "35px",
											marginRight: "7px",
											borderRadius: "5px",
											border: ".5px solid",
										}}
									></img>
								)}
								<strong className="me-auto fs-5">
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
							{tweet.caption}
							<img
								src="https://www.wkbn.com/wp-content/uploads/sites/48/2021/06/football-and-football-field-2.jpg?w=960&h=540&crop=1"
								// style={{
								// 	maxHeight: "100px",
								// 	maxWidth: "100px",
								// }}
								className="img-thumbnail"
								alt=""
							/>
							<div className="container m-1">
								<div className="row">
									<div className="col-1">
										<FaArrowCircleUp
											onClick={() => addLike(tweet._id)}
										></FaArrowCircleUp>
									</div>
									<div className="col-1">{tweet.likes}</div>

									<small className="col-7 d-flex justify-content-end">
										{formatDistanceToNow(
											new Date(tweet.createdAt),
											{ addSuffix: true }
										)}
									</small>
									<button
										type="button"
										class="btn btn-primary btn-block shadow-none"
										style={{
											backgroundColor: "white",
											color: "black",
											border: "none",
										}}
										data-bs-toggle="collapse"
										data-bs-target={[
											`#${tweet.author.username}${index}`,
										]}
									>
										Comments
									</button>
									<div
										id={`${tweet.author.username}${index}`}
										class="collapse show"
									>
										<CommentPage
											tweetId={tweet._id}
											allComments={allComments}
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
