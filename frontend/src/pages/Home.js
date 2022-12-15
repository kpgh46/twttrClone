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
								<div>ReShare: {tweet.retweet}</div>
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
