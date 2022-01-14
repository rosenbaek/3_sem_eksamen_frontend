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
	const editBooking = (body, callback) => {
		const options = ApiFacade.makeOptions("PUT", true, body);
		return fetch(URL + "/api/carwash/booking", options)
			.then(ApiFacade.handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	const deleteBooking = (id, callback) => {
		const options = ApiFacade.makeOptions("DELETE", true);
		return fetch(URL + "/api/carwash/booking/" + id, options)
			.then(ApiFacade.handleHttpErrors)
			.then((res) => {
				return callback(res);
			});
	};

	const createAssistant = (body) => {
		const options = ApiFacade.makeOptions("POST", true, body);
		return fetch(URL + "/api/carwash/assistants", options).then(
			ApiFacade.handleHttpErrors
		);
	};

	const getAllCars = (callback) => {
		const options = ApiFacade.makeOptions("GET", true);
		return fetch(URL + "/api/carwash/cars", options)
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
		createAssistant,
		getAllCars,
		editBooking,
		deleteBooking,
	};
};

export default examFacade();
