import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { authContext } from "./context/authContext";
import { useContext } from "react";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
	const { loggedInUser } = useContext(authContext);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							loggedInUser ? <Home /> : <Navigate to="/login" />
						}
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
			</BrowserRouter>
		</div>
	);
}

export default App;
