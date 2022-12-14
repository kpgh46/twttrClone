import React from "react";
import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import Discover from "./Discover";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateTweet = () => {
	const [caption, setCaption] = React.useState("");
	const [photo, setPhoto] = React.useState("");

	const { addTweet } = useContext(TweetContext);

	return (
		<div className="container">
			<div className="row">
				<form onSubmit={() => addTweet(caption, photo)}>
					<div class="form-floating">
						<textarea
							className="form-control"
							placeholder="Leave a comment here"
							id="floatingTextarea"
							style={{ height: "300px" }}
							onChange={(e) => setCaption(e.target.value)}
						></textarea>
						<label for="floatingTextarea">
							Thinking about something?
						</label>
					</div>
					<div className="form-floating mt-2">
						<input
							class="form-control"
							placeholder="URL"
							id="floatingUrl"
							onChange={(e) => setPhoto(e.target.value)}
						></input>
						<label for="floatingUrl">
							URL for an image (Optional)
						</label>
					</div>
					<button
						style={{
							color: "rgb(66 103 178)",
							borderRadius: "5px",
							backgroundColor: "white",
							marginTop: "5px",
							border: ".5px solid rgb(66 103 178)",
							height: "40px",
							width: "120px",
						}}
					>
						Submit
					</button>
				</form>
				<div className="text-start mt-3">
					<Discover />
				</div>
			</div>
		</div>
	);
};

export default CreateTweet;
