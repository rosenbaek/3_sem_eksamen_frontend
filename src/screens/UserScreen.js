import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateCarComponent from "../components/CreateCarComponent";
import EditCarComponent from "../components/EditCarComponent copy";
import apiFacade from "../facades/apiFacade";
import demoFacade from "../facades/demoFacade";
import examFacade from "../facades/examFacade";

const UserScreen = (props) => {
	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const roles = apiFacade.getUser().roles;
		var inputData;
		if (roles.includes("admin")) {
			examFacade.getAllCars((response) => {
				inputData = response;
			});
		} else {
			examFacade.getUserData((response) => {
				inputData = response.cars;
				setData(response.cars);
			});
		}
		setData(inputData);
	}, []);

	const fetchData = async () => {
		try {
			const roles = apiFacade.getUser().roles;
			var inputData;
			if (roles.includes("admin")) {
				inputData = await examFacade.getAllCars();
			} else {
				inputData = await examFacade.getUserData();
			}

			setData(inputData);
		} catch (error) {
			const e = await error;
			setError(e.message);
		}
	};

	useEffect(() => {
		console.log("DATA: " + JSON.stringify(data));
	});
	return (
		<div
			style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
		>
			<h2 className="header">User Screen</h2>
			<CreateCarComponent />
			<EditCarComponent cars={data} />
		</div>
	);
};

export default UserScreen;
