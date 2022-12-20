import "./App.css";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Router,
} from "react-router-dom";

import { authContext } from "./context/authContext";
import { useContext } from "react";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import CommentPage from "./components/CommentPage";
// import { Router } from "express";

function App() {
	const { loggedInUser } = useContext(authContext);

	return (
		<div className="App">
			<BrowserRouter>
				{/* <Router> */}
				<Routes>
					<Route
						path="/"
						element={
							loggedInUser ? <Home /> : <Navigate to="/login" />
						}
					></Route>
					<Route path="/:id" element={<CommentPage />}></Route>
					<Route
						path="/signup"
						element={
							!loggedInUser ? <SignUp /> : <Navigate to="/" />
						}
					></Route>
					<Route
						path="/login"
						element={
							!loggedInUser ? <LogIn /> : <Navigate to="/" />
						}
					></Route>
				</Routes>
				{/* </Router> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
