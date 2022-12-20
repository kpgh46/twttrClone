import React from "react";
import { useLocation, withRouter } from "react-router-dom";

const CommentPage = () => {
	const location = useLocation();
	const { state } = useLocation();
	const newObject = location;
	// const test = props.location.state;
	console.log(state);
	return <div>Sup</div>;
};

export default CommentPage;
