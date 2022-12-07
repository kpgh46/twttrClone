import React from "react";
import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";

const TweetForm = () => {
	const [caption, setCaption] = React.useState("");
	const [author, setAuthor] = React.useState("");
	const { addTweet } = useContext(TweetContext);

	return (
		<div>
			<form onClick={() => addTweet(caption, author)}>
				<label>Caption</label>
				<input
					type="text"
					onChange={(e) => {
						setCaption(e.target.value);
					}}
				></input>
				<label>Author</label>
				<input
					type="text"
					onChange={(e) => setAuthor(e.target.value)}
				></input>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default TweetForm;
