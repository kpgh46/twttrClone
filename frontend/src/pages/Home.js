import React from "react";
import { useEffect, useContext } from "react";
import TweetForm from "../components/form";
import { TweetContext } from "../context/tweetContext";

let Home = () => {
	const { tweets, getTweets } = useContext(TweetContext);

	useEffect(() => {
		getTweets();
	}, []);
	// console.log(tweets);

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
