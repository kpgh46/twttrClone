import React from "react";
import { useState, useContext } from "react";
import { authContext } from "../context/authContext";

const CommentPage = (props) => {
	const [comment, setComment] = useState("");
	const { loggedInUser } = useContext(authContext);

	const addComment = async (tweetId, text) => {
		const response = await fetch("api/addcomment", {
			method: "POST",
			body: JSON.stringify({ tweetId, text }),
			headers: {
				Authorization: `Bearer ${loggedInUser.token}`,
				"Content-Type": "application/json",
			},
		});

		// const json = await response.json();

		if (response.ok) {
			console.log(props.allComments);
		}
	};

	//filter comments for specific tweet
	// eslint-disable-next-line array-callback-return
	let tweetComments = props.allComments.filter((comment) => {
		if (comment.tweet === props.tweetId) {
			return comment;
		}
	});

	return (
		<div>
			<button onClick={() => addComment(props.tweetId, comment)}>
				Add Comment
			</button>
			<input
				type="text"
				onChange={(e) => setComment(e.target.value)}
			></input>
			{tweetComments &&
				tweetComments.map((comment) => <div>{comment.text}</div>)}
		</div>
	);
};

export default CommentPage;
