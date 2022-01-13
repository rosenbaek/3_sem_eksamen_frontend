import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const CreateAssistantComponent = () => {
	const initialAssistant = {
		name: "",
		primaryLanguage: "",
		rate: 0.0,
		experience: 0.0,
	};
	const [assistant, setAssistant] = useState(initialAssistant);

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setAssistant({ ...assistant, [id]: value });
	};

	const createAssistant = async () => {
		try {
			await examFacade.createAssistant(assistant);
			alert("Assistant created!");
		} catch (error) {
			const e = await error;
			alert(e.message);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		createAssistant();
		setAssistant(initialAssistant);
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				backgroundColor: "#EBEBEB",
				maxWidth: "550px",
				padding: 20,
				margin: 10,
				borderRadius: 5,
			}}
		>
			<h2>Create Washing Assistant</h2>
			<Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Name:</Form.Label>
						<Form.Control
							type="text"
							id="name"
							value={assistant.name}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Primary Language:</Form.Label>
						<Form.Control
							type="text"
							id="primaryLanguage"
							value={assistant.primaryLanguage}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Hourly Rate:</Form.Label>
						<Form.Control
							type="number"
							id="rate"
							step="0.1"
							min={0}
							value={assistant.rate}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Years of experience:</Form.Label>
						<Form.Control
							type="number"
							id="experience"
							step="0.1"
							min={0}
							value={assistant.experience}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Row>

				<br></br>
				<Button variant="primary" type="submit" value="Submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default CreateAssistantComponent;
