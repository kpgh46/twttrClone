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
		document.getElementById("commentInput").value = "";
	};

	//filter comments for specific tweet
	// eslint-disable-next-line array-callback-return
	let tweetComments = props.allComments.filter((comment) => {
		if (comment.tweet === props.tweetId) {
			return comment;
		}
	});

	return (
		<div className="input-group mb-3 row h-50">
			<button
				onClick={() => addComment(props.tweetId, comment)}
				className="btn btn-outline-secondary col-2 ms-2"
				type="button"
			>
				Add
			</button>
			<input
				type="text"
				onChange={(e) => setComment(e.target.value)}
				className="form-control rounded"
				id="commentInput"
			></input>
			{tweetComments &&
				tweetComments.map((comment) => (
					<div className="text-start ms-2 mt-1 border-bottom">
						{comment.author.username}: {comment.text}
					</div>
				))}
		</div>
	);
};

export default CommentPage;
