import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import BookingCardComponent from "./BookingCardComponent";

const CarComponent = ({ car, cars, assistants, reload }) => {
	return (
		<div
			style={{
				margin: 20,
				padding: 20,
				backgroundColor: "#ebebeb",
				borderRadius: 7,
				textTransform: "capitalize",
			}}
		>
			<h3>{car.brand}</h3>
			<h5>{car.make}</h5>
			<p>{car.year}</p>
			<h6>Bookings:</h6>
			{car.bookings.map((booking) => {
				return (
					<BookingCardComponent
						key={booking.id}
						currentCar={car}
						bookingInitial={booking}
						assistants={assistants}
						cars={cars}
						reload={reload}
					/>
				);
			})}
		</div>
	);
};

export default CarComponent;
