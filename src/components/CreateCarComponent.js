import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const CreateCarComponent = () => {
	const initialCar = {
		registration: "",
		brand: "",
		make: "",
		year: 0,
	};
	const [car, setCar] = useState(initialCar);

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setCar({ ...car, [id]: value });
	};

	const createCar = async () => {
		console.log(JSON.stringify(car));
		try {
			await examFacade.createCar(car);
			alert("Car created!");
		} catch (error) {
			const e = await error;
			alert(e.message);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createCar();
		setCar(initialCar);
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
			<h2>Create Car</h2>
			<Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Registration:</Form.Label>
						<Form.Control
							type="text"
							id="registration"
							value={car.registration}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Brand:</Form.Label>
						<Form.Control
							type="text"
							id="brand"
							value={car.brand}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Make:</Form.Label>
						<Form.Control
							type="text"
							id="make"
							value={car.make}
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Year:</Form.Label>
						<Form.Control
							type="number"
							id="year"
							value={car.year}
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

export default CreateCarComponent;
