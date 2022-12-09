import React from "react";
import Card from "react-bootstrap/Card";
import { useContext, useEffect } from "react";
import { TweetContext } from "../context/tweetContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TweetCard = () => {
	const { tweets, getTweets } = useContext(TweetContext);

	useEffect(() => {
		getTweets();
	}, []);

	return (
		<div>
			{tweets &&
				tweets.map((tweet) => (
					<Card>
						<p key={tweet._id}>
							{tweet.author} - {tweet.caption} {tweet.likes}
							{formatDistanceToNow(new Date(tweet.createdAt), {
								addSuffix: true,
							})}
						</p>
					</Card>
				))}
		</div>
	);
};

export default TweetCard;