import React from "react";
import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateTweet = () => {
	const [caption, setCaption] = React.useState("");
	const [photo, setPhoto] = React.useState("");

	const { addTweet } = useContext(TweetContext);
	// const { loggedInUser } = useContext(authContext);
	console.log(photo);

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
							What what you thinking about?
						</label>
					</div>
					<div className="form-floating mt-2">
						<input
							class="form-control"
							placeholder="URL"
							id="floatingUrl"
							onChange={(e) => setPhoto(e.target.value)}
						></input>
						<label for="floatingUrl">Add a URL (Optional)</label>
					</div>
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTweet;
