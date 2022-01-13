import { URL } from "../constants.js";
import ApiFacade from "./apiFacade";

const examFacade = () => {
	const createUser = (user) => {
		const options = ApiFacade.makeOptions("POST", true, user);
		return fetch(URL + "/api/user", options).then(ApiFacade.handleHttpErrors);
	};

	const fetchAssistants = (callback) => {
		const options = ApiFacade.makeOptions("GET", true);
		return fetch(URL + "/api/carwash/assistants", options)
			.then(ApiFacade.handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	const getUserData = (callback) => {
		const options = ApiFacade.makeOptions("GET", true);
		return fetch(URL + "/api/user", options)
			.then(ApiFacade.handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	const addBooking = (body, callback) => {
		const options = ApiFacade.makeOptions("POST", true, body);
		return fetch(URL + "/api/carwash/booking", options)
			.then(ApiFacade.handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	return {
		createUser,
		fetchAssistants,
		getUserData,
		addBooking,
	};
};

export default examFacade();
