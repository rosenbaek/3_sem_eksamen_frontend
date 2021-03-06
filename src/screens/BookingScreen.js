import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AddBookingComponent from "../components/AddBookingComponent";
import AssistantComponent from "../components/AssistantComponent";
import CarComponent from "../components/CarComponent";
import apiFacade from "../facades/apiFacade";
import examFacade from "../facades/examFacade";

const ProtectedScreen = () => {
	const [cars, setCars] = useState([]);
	const [reload, setReload] = useState(false);
	const [assistants, setAssistants] = useState([]);

	useEffect(() => {
		const roles = apiFacade.getUser().roles;
		if (roles.includes("admin")) {
			examFacade.getAllCars((response) => {
				setCars(response);
			});
		} else {
			examFacade.getUserData((response) => {
				setCars(response.cars);
			});
		}
		examFacade.fetchAssistants((response) => {
			console.log(JSON.stringify(response));
			setAssistants(response);
		});
	}, [reload]);

	useEffect(() => {
		console.log(JSON.stringify(cars));
	});

	const reloadNow = () => {
		setReload(!reload);
	};
	return (
		<Container fluid="md">
			<h2 className="header">Booking Screen</h2>
			<AddBookingComponent
				assistants={assistants}
				cars={cars}
				reload={reloadNow}
			/>
			<AssistantComponent />
			{cars.map((car) => {
				return (
					<CarComponent
						key={car.registration}
						car={car}
						assistants={assistants}
						cars={cars}
						reload={reloadNow}
					/>
				);
			})}
		</Container>
	);
};

export default ProtectedScreen;
