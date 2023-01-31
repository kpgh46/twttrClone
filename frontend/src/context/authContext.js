import React from "react";
import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

const AuthContextProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [currentUsers, setCurrentUsers] = useState([]);
	const [render, setRender] = useState(false);

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

	const findUnqiue = (arr1, arr2) => {
		let empty = [];

		arr2.forEach((item) => {
			if (!arr1.includes(item._id)) {
				empty.push(item);
			}
		});
		return empty;
	};

	const runRender = () => {
		setRender(!render);
	};

	useEffect(() => {
		let fetchAllUsers = async () => {
			let response = await fetch("api/users", {
				headers: {
					Authorization: `Bearer ${loggedInUser.token}`,
				},
			});
			const json = await response.json();
			//filters out already followed users
			if (response.ok) {
				let loggedInFollows = loggedInUser.user.follows;
				let allUsers = json.allUsers;
				const unFollowedUsers = findUnqiue(loggedInFollows, allUsers);

				const filteredUnfollowed = unFollowedUsers.filter(
					(user) => user._id !== loggedInUser.user._id
				);
				console.log("useEffect ran");

				setCurrentUsers(filteredUnfollowed);
			}
		};

		fetchAllUsers();
	}, [render]);

	return (
		<authContext.Provider
			value={{
				loggedInUser,
				setLoggedInUser,
				setUser,
				removeUser,
				currentUsers,
				runRender,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
