import React from "react";
import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import { authContext } from "../context/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateTweet = () => {
	const [caption, setCaption] = React.useState("");

	const { addTweet } = useContext(TweetContext);
	const { loggedInUser } = useContext(authContext);

	return (
		<div className="container">
			<div className="row">HOME</div>
			<div className="row">
				<form onClick={() => addTweet(caption)}>
					<label>Caption</label>
					<input
						type="text"
						onChange={(e) => {
							setCaption(e.target.value);
						}}
					></input>
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTweet;
