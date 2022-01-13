import { URL } from "../constants.js";
import Facade from "./apiFacade";

const demoFacade = () => {
	const dataThreads = () => {
		const options = Facade.makeOptions("GET", true);
		return fetch(URL + "/api/info/threads", options).then(
			Facade.handleHttpErrors
		);
	};

	return {
		dataThreads,
	};
};

export default demoFacade();
