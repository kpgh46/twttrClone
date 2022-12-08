import React from "react";
import Card from "react-bootstrap/Card";
import { useContext, useEffect } from "react";
import { TweetContext } from "../context/tweetContext";

const TweetCard = () => {
	const { tweets, getTweets } = useContext(TweetContext);

	useEffect(() => {
		getTweets();
	}, []);
	console.log(tweets);

	return (
		<div>
			{tweets &&
				tweets.map((tweet) => (
					<Card>
						<p key={tweet._id}>
							{tweet.author} - {tweet.caption} {tweet.likes}
						</p>
					</Card>
				))}
		</div>
	);
};

export default TweetCard;
