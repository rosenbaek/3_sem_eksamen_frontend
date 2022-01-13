import { useEffect, useState } from "react";
import AddBookingComponent from "../components/AddBookingComponent";
import AssistantComponent from "../components/AssistantComponent";
import CarComponent from "../components/CarComponent";
import examFacade from "../facades/examFacade";

const ProtectedScreen = () => {
	const [cars, setCars] = useState([]);
	const [assistants, setAssistants] = useState([]);

	useEffect(() => {
		examFacade.getUserData((response) => {
			setCars(response.cars);
		});
		examFacade.fetchAssistants((response) => {
			console.log(JSON.stringify(response));
			setAssistants(response);
		});
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(cars));
	});

	return (
		<div>
			<h2 className="header">Booking Screen</h2>
			<AddBookingComponent assistants={assistants} cars={cars} />
			<AssistantComponent />
			{cars.map((car) => {
				return <CarComponent key={car.registration} car={car} />;
			})}
		</div>
	);
};

export default ProtectedScreen;
