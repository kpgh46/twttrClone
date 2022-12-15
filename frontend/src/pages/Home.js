import React from "react";
import CreateTweet from "../components/CreateTweet";
import TweetCard from "../components/TweetCard";
import Navbar from "../components/Navbar";
import FollowUsers from "../components/FollowUsers";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";

let Home = () => {
	return (
		<div className="container border">
			<Header />
			<Navbar />
			<div className="row">
				<Card className="col-3 border">
					<CreateTweet />
				</Card>
				<div className="col-6">
					<TweetCard />
				</div>
				<Card className="col border">
					<h1>USER list</h1>
					<FollowUsers />
				</Card>
			</div>
		</div>
	);
};

export default Home;
