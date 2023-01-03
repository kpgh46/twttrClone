import React from "react";
import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

const AuthContextProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [currentUsers, setCurrentUsers] = useState([]);

	const setUser = (user) => {
		setLoggedInUser(user);
	};

	const removeUser = () => {
		setLoggedInUser(null);
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		// console.log("from AuthContext", user);

		if (user) {
			setUser(user);
		}
	}, []);

	// useEffect(() => {
	// 	localStorage.setItem("user", JSON.stringify(loggedInUser));
	// 	// setUser(loggedInUser);
	// }, []);

	// console.log("From Context:", loggedInUser);

	return (
		<authContext.Provider
			value={{ loggedInUser, setLoggedInUser, setUser, removeUser }}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
