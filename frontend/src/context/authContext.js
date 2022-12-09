import React from "react";
import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useState(null);

	const setUser = (user) => {
		setLoggedInUser(user);
	};

	return (
		<authContext.Provider
			value={{ loggedInUser, setLoggedInUser, setUser }}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
