import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const AssistantComponent = () => {
	const [assistants, setAssistants] = useState([]);
	const [cars, setCars] = useState([]);

	useEffect(() => {
		examFacade.fetchAssistants((response) => {
			console.log(JSON.stringify(response));
			setAssistants(response);
		});
	}, []);

	return (
		<div
			style={{
				margin: 20,
				padding: 20,
				backgroundColor: "#ebebeb",
				borderRadius: 7,
			}}
		>
			<h5 style={{ paddingBottom: 20 }}>Washing Assistants</h5>
			<Table striped bordered hover style={{ backgroundColor: "white" }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Primary Language</th>
						<th>Experience</th>
						<th>Hourly Rate</th>
					</tr>
				</thead>
				<tbody>
					{assistants.map((a) => {
						return (
							<tr>
								<td>{a.name}</td>
								<td>{a.primaryLanguage}</td>
								<td>{a.experience}</td>
								<td>{a.rate}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default AssistantComponent;
