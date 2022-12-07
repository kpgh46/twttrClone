import React from "react";
import { createContext, useState } from "react";

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);

	let getTweets = async () => {
		let response = await fetch("api/tweets");
		let json = await response.json();

		if (response.ok) {
			setTweets(json);
		}
	};

	let addTweet = async (caption, author) => {
		const response = await fetch("/api/tweets", {
			method: "POST",
			body: JSON.stringify({ caption, author }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await response;

		if (response.ok) {
			console.log(json);
		}
	};

	//delete tweet

	return (
		<TweetContext.Provider value={{ tweets, getTweets, addTweet }}>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
