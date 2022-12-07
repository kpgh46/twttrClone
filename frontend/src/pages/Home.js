import React from "react";
import { useState, useEffect } from "react";
import TweetForm from "../components/form";

let Home = () => {
	let [tweets, setTweets] = useState(null);

	useEffect(() => {
		let getTweets = async () => {
			let response = await fetch("api/tweets");
			let json = await response.json();

			if (response.ok) {
				setTweets(json);
			}
		};

		getTweets();
	}, []);

	return (
		<div>
			<h1>This is the home page</h1>
			<TweetForm />
			{tweets &&
				tweets.map((tweet) => (
					<p key={tweet._id}>
						{tweet.author} - {tweet.caption}
					</p>
				))}
		</div>
	);
};

export default Home;
