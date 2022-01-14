import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import examFacade from "../facades/examFacade";
import Datetime from "react-datetime";

const AddBookingComponent = ({ assistants, cars, reload }) => {
	const initialState = {
		carReg: "",
		dateTime: Date.now(),
		duration: 0,
		washingAssistants: [],
	};
	const [filteredAssistants, setFilteredAssistants] = useState([]);
	const [selected, setSelected] = useState([]);
	const [booking, setBooking] = useState(initialState);
	const [searchValue, setSearchValue] = useState("");
	const [totalCost, setTotalCost] = useState(0);

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setBooking({ ...booking, [id]: value });
	};

	useEffect(() => {
		if (selected.length > 0) {
			var cost = 0;
			selected.forEach((s) => {
				cost += (s.rate / 60) * booking.duration;
			});
			setTotalCost(cost);
		}
	});

	const updateTime = (time) => {
		setBooking({ ...booking, dateTime: time.format() });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		booking.washingAssistants = selected;
		booking.dateTime = new Date(booking.dateTime);
		if (selected.length === 0) {
			alert("please select at least one assistant");
		} else if (booking.car === "") {
			alert("please select a car");
		} else {
			examFacade.addBooking(booking, () => {
				alert("Succes");
				setBooking(initialState);
				reload();
			});
		}
	};

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setSearchValue(searchWord);

		const newFilter = assistants.filter((assistant) => {
			return assistant.name.toLowerCase().includes(searchWord.toLowerCase());
		});

		if (searchWord === "") {
			setFilteredAssistants([]);
		} else {
			setFilteredAssistants(newFilter);
		}
	};

	const addAssistantToBooking = (assistant) => {
		if (!selected.includes(assistant)) {
			setSelected([...selected, assistant]);
		}

		setSearchValue("");
	};

	return (
		<div
			style={{
				margin: 20,
				padding: 20,
				backgroundColor: "#ebebeb",
				borderRadius: 7,
			}}
		>
			<h3>Add Booking</h3>
			<Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Car:</Form.Label>
						<Form.Control as="select" id="carReg" onChange={handleChange}>
							<option disabled>Choose car</option>
							{cars.map((car) => {
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
						<Form.Label>Time:</Form.Label>
						<Datetime
							id="dateTime"
							onChange={updateTime}
							value={new Date(booking.dateTime)}
						/>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Duration in Minutes:</Form.Label>
						<Form.Control
							type="number"
							id="duration"
							onChange={handleChange}
							value={booking.duration}
							min={1}
						/>
					</Form.Group>

					<Form.Group as={Col} xs={6}>
						<Form.Label>Add Washing Assistants:</Form.Label>
						<Form.Control
							type="search"
							id="search"
							placeholder="Search Washing Assistants"
							onChange={handleFilter}
							value={searchValue}
						/>
						<Table striped bordered hover style={{ zIndex: 200 }}>
							<tbody>
								{filteredAssistants &&
									filteredAssistants.slice(0, 5).map((assistant) => {
										if (
											assistant.name
												.toLowerCase()
												.includes(searchValue.toLowerCase()) &&
											searchValue != "" &&
											!booking.washingAssistants.includes(assistant)
										) {
											return (
												<tr
													onClick={() => addAssistantToBooking(assistant)}
													key={assistant.id}
												>
													<td>{assistant.name}</td>
												</tr>
											);
										}
									})}
								{filteredAssistants &&
								filteredAssistants.size === 0 &&
								searchValue !== "" ? (
									<tr>
										<td>No Washing Assistants Found</td>
									</tr>
								) : null}
							</tbody>
						</Table>
					</Form.Group>
				</Row>

				{selected && selected.length > 0 ? (
					<Table
						striped
						bordered
						hover
						style={{
							marginLeft: "auto",
							marginRight: "auto",
							backgroundColor: "white",
						}}
					>
						<thead>
							<tr>
								<th>Name</th>
								<th>Primary Language</th>
								<th>Experience</th>
								<th>Hourly Rate</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{selected &&
								selected.map((assistant) => {
									return (
										<tr key={assistant}>
											<td>{assistant.name}</td>
											<td>{assistant.primaryLanguage}</td>
											<td>{assistant.experience}</td>
											<td>{assistant.rate}</td>
											<td>
												<Button
													variant="danger"
													size="sm"
													onClick={() => {
														setSelected([
															...selected.filter(
																(as) => as.id !== Number(assistant.id)
															),
														]);
													}}
												>
													Remove
												</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				) : null}
				<p>Total Cost: {totalCost}</p>
				<br />
				<Button variant="primary" type="submit" value="Submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default AddBookingComponent;
