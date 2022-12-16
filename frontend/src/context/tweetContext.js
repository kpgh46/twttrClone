import React from "react";
import { createContext, useState, useContext } from "react";
import { authContext } from "./authContext";

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);
	const { loggedInUser } = useContext(authContext);

	let getTweets = async (token) => {
		let response = await fetch("api/tweets", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		let json = await response.json();

		if (response.ok) {
			setTweets(json);
		}
	};

	//will add more parameters here and CreateTweet component
	let addTweet = async (caption, author, likes, retweets) => {
		const response = await fetch("/api/tweets", {
			method: "POST",
			body: JSON.stringify({ caption, likes, retweets, author }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${loggedInUser.token}`,
			},
		});
		const json = await response;

		if (response.ok) {
			console.log(json);
		}
	};

	const resetTweets = () => {
		setTweets(null);
	};

	//delete tweet

	return (
		<TweetContext.Provider
			value={{ tweets, addTweet, setTweets, getTweets, resetTweets }}
		>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
