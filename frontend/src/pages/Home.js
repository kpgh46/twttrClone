import React from "react";
import CreateTweet from "../components/CreateTweet";
import TweetCard from "../components/TweetCard";
import Navbar from "../components/Navbar";
import FollowUsers from "../components/FollowUsers";

import "bootstrap/dist/css/bootstrap.min.css";

let Home = () => {
	return (
		<div className="container border">
			<Navbar />
			<div className="row">
				<div className="col-3 border">This is the far left row</div>
				<div className="col-6">
					<CreateTweet />
					<TweetCard />
				</div>
				<div className="col border">
					<h1>USER list</h1>
					<FollowUsers />
				</div>
			</div>
		</div>
	);
};

export default Home;
