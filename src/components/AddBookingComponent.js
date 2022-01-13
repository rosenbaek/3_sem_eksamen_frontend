import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const AddBookingComponent = ({ assistants, cars }) => {
	const initialState = {
		car: {},
		dateTime: "",
		duration: 0,
		washingAssistants: [],
	};
	const [filteredAssistants, setFilteredAssistants] = useState([]);
	const [selected, setSelected] = useState([]);
	const car = [{ brand: "audi", make: "A4" }];
	const [booking, setBooking] = useState(initialState);
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setBooking({ ...booking, [id]: value });
	};

	useEffect(() => {
		console.log(JSON.stringify(selected));
	});
	const handleSubmit = (event) => {
		event.preventDefault();

		alert("Please select atleast one role");
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

	const removeAssistantFromBooking = (assistant) => {
		setSelected(
			selected.filter((a) => {
				return assistant.id !== a.id;
			})
		);
	};

	return (
		<div style={{ backgroundColor: "green" }}>
			<h3>Add Booking</h3>
			<Form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Car:</Form.Label>
						<Form.Select aria-label="Default select example">
							<option>Select Car</option>
							{cars.map((car) => {
								return (
									<option value={car}>
										Registration: {car.registration.toUpperCase()}, Brand:{" "}
										{car.brand.toUpperCase()}, Make: {car.make.toUpperCase()},
										Year: {car.year}
									</option>
								);
							})}
						</Form.Select>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Time:</Form.Label>
						<Form.Control
							type="datetime-local"
							id="dateTime"
							onChange={handleChange}
							value={booking.dateTime}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Add Washing Assistants:</Form.Label>
						<Form.Control
							type="search"
							id="search"
							onChange={handleFilter}
							value={searchValue}
							style={{
								width: "50%",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						/>
						<Table
							striped
							bordered
							hover
							style={{
								width: "50%",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
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
						<Table
							striped
							bordered
							hover
							style={{
								marginLeft: "auto",
								marginRight: "auto",
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
														onClick={(assistant) =>
															removeAssistantFromBooking(assistant)
														}
													>
														Remove
													</Button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
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

export default AddBookingComponent;