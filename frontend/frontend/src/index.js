import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TweetContextProvider from "./context/tweetContext";
import AuthContextProvider from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TweetContextProvider>
				<App />
			</TweetContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
