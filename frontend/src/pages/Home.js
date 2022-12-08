import React from "react";
import { useEffect, useContext } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetCard from "../components/TweetCard";
import { TweetContext } from "../context/tweetContext";

// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

let Home = () => {
	return (
		<div className="container border">
			<div className="row">
				<div className="col-3 border">This is the far left row</div>
				<div className="col-6">
					<CreateTweet />
					<TweetCard />
				</div>
				<div className="col border">This is the far RIGHT row</div>
			</div>
		</div>
	);
};

export default Home;
