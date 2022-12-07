import React from "react";

const TweetForm = () => {
	const [caption, setCaption] = React.useState("");
	const [author, setAuthor] = React.useState("");

	const clickSubmit = async () => {
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

	return (
		<div>
			<form onClick={clickSubmit}>
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
