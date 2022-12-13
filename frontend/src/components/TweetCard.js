import React from "react";
import Card from "react-bootstrap/Card";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { TweetContext } from "../context/tweetContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TweetCard = (props) => {
	return (
		<div>
			{props.tweets.map((tweet) => (
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
