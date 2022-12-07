import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
					<Route path="/login" element={<LogIn />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
