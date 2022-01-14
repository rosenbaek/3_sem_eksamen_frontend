import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import examFacade from "../facades/examFacade";

const EditCarComponent = ({ cars }) => {
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
	const handleCarChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		const newCar = cars.filter((c) => c.registration === value);
		console.log("test: " + value + "--" + JSON.stringify(newCar));
		setCar(newCar[0]);
	};

	useEffect(() => {
		console.log("CARS ->>>>: " + JSON.stringify(car));
	});
	const editCar = async () => {
		console.log(JSON.stringify(car));
		try {
			await examFacade.editCar(car);
			alert("Car edited!");
		} catch (error) {
			const e = await error;
			alert(e.message);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		editCar();
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
			<h2>Edit Car</h2>
			<Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Car:</Form.Label>
						<Form.Control as="select" id="carReg" onChange={handleCarChange}>
							<option disabled>Choose car</option>
							{cars &&
								cars.map((car) => {
									return (
										<option value={car.registration}>
											Registration: {car.registration.toUpperCase()}, Brand:{" "}
											{car.brand.toUpperCase()}, Make: {car.make.toUpperCase()},
											Year: {car.year}
										</option>
									);
								})}
						</Form.Control>
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

export default EditCarComponent;
