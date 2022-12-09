import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TweetContextProvider from "./context/tweetContext";
import AuthContextProvider from "./context/authContext";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
	console.log("hi, from Appjs");
	return (
		<div className="App">
			<AuthContextProvider>
				<TweetContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="/signup" element={<SignUp />}></Route>
							<Route path="/login" element={<LogIn />}></Route>
						</Routes>
					</BrowserRouter>
				</TweetContextProvider>
			</AuthContextProvider>
		</div>
	);
}

export default App;
