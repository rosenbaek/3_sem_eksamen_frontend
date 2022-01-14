import { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
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
			<h3>Brand: {car.brand}</h3>
			<h5>Make: {car.make}</h5>
			<p>Year: {car.year}</p>
			<p>Registration: {car.registration}</p>
			<p>Total money spend: {car.totalCost}</p>
			<h6>Bookings:</h6>
			<Row className=".row-cols-md-2">
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
			</Row>
		</div>
	);
};

export default CarComponent;
