import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CreateCarComponent from "../components/CreateCarComponent";
import demoFacade from "../facades/demoFacade";

const UserScreen = (props) => {
	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const inputData = await demoFacade.dataThreads();
			setData(inputData);
		} catch (error) {
			const e = await error;
			setError(e.message);
		}
	};

	return (
		<div
			style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
		>
			<h2 className="header">User Screen</h2>
			<CreateCarComponent />
		</div>
	);
};

export default UserScreen;
