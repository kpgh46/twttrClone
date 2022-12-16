import React from "react";
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

const TweetCard = () => {
	const { loggedInUser } = useContext(authContext);
	const { tweets, setTweets } = useContext(TweetContext);

	useEffect(() => {
		const fetchTweets = async () => {
			let response = await fetch("api/tweets", {
				headers: {
					Authorization: `Bearer ${loggedInUser.token}`,
				},
			});
			let json = await response.json();

			if (response.ok) {
				setTweets(json);
			}
		};

		if (loggedInUser) {
			fetchTweets();
		}
	}, [loggedInUser]);

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
			console.log("this worked from addLike", json);

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
			console.log("this worked from addLike", json);
		}
		// console.log("sup");
	};
	return (
		<div>
			{tweets &&
				tweets.map((tweet) => (
					<Toast className="container mb-3">
						<div key={tweet._id}>
							<Toast.Header closeButton={false}>
								<img
									src="holder.js/20x20?text=%20"
									className="rounded me-2"
									alt=""
								/>
								<strong className="me-auto fs-5">
									{tweet.author.username}
								</strong>
								<AiFillCloseCircle
									onClick={() => deleteTweet(tweet._id)}
								></AiFillCloseCircle>
							</Toast.Header>
							{tweet.caption}
							<div className="container m-1">
								<div className="row">
									<div className="col-1">
										<FaArrowCircleUp
											onClick={() => addLike(tweet._id)}
										></FaArrowCircleUp>
									</div>
									<div className="col-1">{tweet.likes}</div>

									<small className="col-10 d-flex justify-content-end">
										{formatDistanceToNow(
											new Date(tweet.createdAt),
											{ addSuffix: true }
										)}
									</small>
								</div>
							</div>
						</div>
					</Toast>
				))}
		</div>
	);
};

export default TweetCard;
