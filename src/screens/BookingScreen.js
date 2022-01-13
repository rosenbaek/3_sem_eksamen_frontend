import { useEffect, useState } from "react";
import AssistantComponent from "../components/AssistantComponent";
import CarComponent from "../components/CarComponent";
import examFacade from "../facades/examFacade";

const ProtectedScreen = () => {
	const [cars, setCars] = useState([]);

	useEffect(() => {
		examFacade.getUserData((response) => {
			setCars(response.cars);
		});
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(cars));
	});

	return (
		<div>
			<h2 className="header">Booking Screen</h2>
			<AssistantComponent />
			{cars.map((car) => {
				return <CarComponent key={car.registration} car={car} />;
			})}
		</div>
	);
};

export default ProtectedScreen;
