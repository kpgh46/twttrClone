import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { authContext } from "./context/authContext";
import { useContext } from "react";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ProfilePage from "./pages/Profile";
import Comment from "./components/Comment";
import UserProfile from "./components/UserProfile";
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
					<Route path="/:id" element={<Comment />}></Route>
					<Route
						path="/profile/:id"
						element={<ProfilePage />}
					></Route>
					<Route
						path="/userprofile/:id"
						element={<UserProfile />}
					></Route>
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
