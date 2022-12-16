import React from "react";
import { useContext } from "react";
import { TweetContext } from "../context/tweetContext";
import { authContext } from "../context/authContext";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateTweet = () => {
	const [caption, setCaption] = React.useState("");

	const { addTweet } = useContext(TweetContext);
	const { loggedInUser } = useContext(authContext);

	return (
		<div className="container">
			<div className="row">
				<Form onClick={() => addTweet(caption)}>
					<FloatingLabel
						controlId="floatingTextarea2"
						label="What are you thinking about?"
					>
						<Form.Control
							as="textarea"
							placeholder=""
							style={{ height: "100px" }}
							onChange={(e) => setCaption(e.target.value)}
						/>
					</FloatingLabel>
					<button>Submit</button>
				</Form>
			</div>
		</div>
	);
};

export default CreateTweet;
