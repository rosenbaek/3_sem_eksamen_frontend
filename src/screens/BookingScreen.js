import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AssistantComponent from "../components/AssistantComponent";
import examFacade from "../facades/examFacade";

const ProtectedScreen = () => {
	const [assistants, setAssistants] = useState([]);

	useEffect(() => {
		examFacade.fetchAssistants((response) => {
			console.log(JSON.stringify(response));
			setAssistants(response);
		});
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(assistants));
	});

	return (
		<div>
			<h2 className="header">Booking Screen</h2>
			<AssistantComponent />
		</div>
	);
};

export default ProtectedScreen;
