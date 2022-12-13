import React from "react";
import { createContext, useState } from "react";

export const TweetContext = createContext();

const TweetContextProvider = (props) => {
	const [tweets, setTweets] = useState([]);

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
	let addTweet = async (caption) => {
		const response = await fetch("/api/tweets", {
			method: "POST",
			body: JSON.stringify({ caption }),
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${loggedInUser.token}`,
			},
		});
		const json = await response;

		if (response.ok) {
			console.log(json);
		}
	};

	//delete tweet

	return (
		<TweetContext.Provider
			value={{ tweets, addTweet, setTweets, getTweets }}
		>
			{props.children}
		</TweetContext.Provider>
	);
};

export default TweetContextProvider;
