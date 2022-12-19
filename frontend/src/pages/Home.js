import React from "react";
import CreateTweet from "../components/CreateTweet";
import TweetCard from "../components/TweetCard";
import NavigationBar from "../components/Navbar";
import FollowUsers from "../components/FollowUsers";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";

let Home = () => {
	return (
		<div className="container w-75">
			<NavigationBar />
			<div className="row">
				<div className="col-3 border-end">
					<CreateTweet />
				</div>
				<div className="col-6">
					<TweetCard />
				</div>
				<div className="col border-start">
					<div>Suggested Follows:</div>
					<FollowUsers />
				</div>
			</div>
		</div>
	);
};

export default Home;
