import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import apiFacade from "../facades/apiFacade";
import Datetime from "react-datetime";
import examFacade from "../facades/examFacade";

const BookingCardComponent = ({
	bookingInitial,
	cars,
	assistants,
	currentCar,
	reload,
}) => {
	const [editMode, setEditMode] = useState(false);
	const initialState = {
		carReg: "",
		dateTime: "",
		duration: 0,
		washingAssistants: [],
	};
	const [booking, setBooking] = useState(bookingInitial);
	const [filteredAssistants, setFilteredAssistants] = useState([]);

	const [searchValue, setSearchValue] = useState("");
	useEffect(() => {
		setBooking({ ...booking, carReg: currentCar.registration });
	}, []);
	useEffect(() => {
		console.log(booking);
	});
	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setBooking({ ...booking, [id]: value });
	};
	const updateTime = (time) => {
		setBooking({ ...booking, dateTime: time.format() });
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

	const handleSubmit = (event) => {
		event.preventDefault();
		examFacade.editBooking(booking, () => {
			alert("Succes");
			reload();
		});
	};

	const addAssistantToBooking = (assistant) => {
		console.log(booking.washingAssistants);
		if (
			booking.washingAssistants.filter(function (a) {
				return a.id === assistant.id;
			}).length === 0
		) {
			setBooking({
				...booking,
				washingAssistants: [...booking.washingAssistants, assistant],
			});
		}

		setSearchValue("");
	};

	const removeWashingAssistant = (assistant) => {
		if (booking.washingAssistants.length > 1) {
			setBooking({
				...booking,
				washingAssistants: [
					...booking.washingAssistants.filter(
						(as) => as.id !== Number(assistant.id)
					),
				],
			});
		} else {
			alert("ERROR: At least 1 Washing Assistant is needed");
		}
	};

	const setEditModeTrue = () => {
		const roles = apiFacade.getUser().roles;
		if (roles.includes("admin")) {
			setEditMode(true);
		}
	};
	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				padding: 20,
				margin: 10,
				backgroundColor: "grey",
				flexDirection: "column",
				minWidth: "300px",
				borderRadius: 7,
			}}
		>
			<div
				className="close"
				style={{
					right: 10,
					top: -5,
					fontSize: 30,
				}}
			></div>
			{!editMode ? (
				<div onClick={setEditModeTrue}>
					<h6>{booking.dateTime}</h6>
					<p>Duration: {booking.duration}</p>
					<p>Assistants:</p>
					<ul>
						{booking.washingAssistants.map((assistant) => {
							return <li>{assistant.name}</li>;
						})}
					</ul>
				</div>
			) : (
				<Form
					onSubmit={handleSubmit}
					style={{ justifyContent: "center", zIndex: 2 }}
				>
					<Form.Group as={Col}>
						<Form.Label>Car:</Form.Label>
						<Form.Control as="select" id="carReg" onChange={handleChange}>
							{cars.map((car) => {
								return (
									<option
										selected={
											car.registration === currentCar.registration
												? true
												: false
										}
										value={car.registration}
									>
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
					<Form.Group>
						<Form.Label>Add Washing Assistants:</Form.Label>
						<Form.Control
							type="search"
							id="search"
							placeholder="Search Wasshing Assistants"
							onChange={handleFilter}
							value={searchValue}
						/>
						<Table striped bordered hover>
							<tbody>
								{filteredAssistants &&
									filteredAssistants.slice(0, 5).map((assistant) => {
										if (
											assistant.name
												.toLowerCase()
												.includes(searchValue.toLowerCase()) &&
											searchValue !== "" &&
											booking.washingAssistants.filter(function (a) {
												return a.id === assistant.id;
											}).length === 0
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
								{booking.washingAssistants.map((assistant) => {
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
														removeWashingAssistant(assistant);
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
					</Form.Group>

					<br></br>
					<Button
						variant="primary"
						style={{ margin: 5 }}
						onClick={() => setEditMode(false)}
					>
						Cancel
					</Button>
					<Button
						variant="primary"
						style={{ margin: 5 }}
						type="submit"
						value="Submit"
					>
						Save
					</Button>
				</Form>
			)}
		</div>
	);
};

export default BookingCardComponent;
