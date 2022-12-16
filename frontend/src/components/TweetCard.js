import React from "react";
import Card from "react-bootstrap/Card";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
					<Card>
						<div key={tweet._id}>
							<div>Caption: {tweet.caption}</div>
							<div>UserName:{tweet.author.username}</div>
							<div>Likes: {tweet.likes}</div>
							<button onClick={() => addLike(tweet._id)}>
								UP
							</button>
							<br></br>
							<button onClick={() => deleteTweet(tweet._id)}>
								Delete
							</button>
						</div>
					</Card>
				))}
		</div>
	);
};

export default TweetCard;
