import React from "react";
import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useState(null);

	const setUser = (user) => {
		setLoggedInUser(user);
	};

	const removeUser = () => {
		setLoggedInUser(null);
	};

	console.log("From Context:", loggedInUser);

	return (
		<authContext.Provider
			value={{ loggedInUser, setLoggedInUser, setUser, removeUser }}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
