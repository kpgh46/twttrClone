import React, { useEffect } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetCard from "../components/TweetCard";
import Navbar from "../components/Navbar";
import FollowUsers from "../components/FollowUsers";
import { useContext, useState } from "react";

import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";

// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

let Home = () => {
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

	return (
		<div className="container border">
			<Navbar />
			<div className="row">
				<div className="col-3 border">This is the far left row</div>
				<div className="col-6">
					<CreateTweet />
					{tweets &&
						tweets.map((tweet) => (
							<div key={tweet._id}>
								<div>Caption: {tweet.caption}</div>
								<div>UserName:{tweet.author.username}</div>
								<div>Likes: {tweet.likes}</div>
								<button onClick={() => addLike(tweet._id)}>
									UP
								</button>
								<div>ReShare: {tweet.retweets}</div>
								<div>---BREAK---</div>
							</div>
						))}
				</div>
				<div className="col border">
					<h1>USER list</h1>
					<FollowUsers />
				</div>
			</div>
		</div>
	);
};

export default Home;
