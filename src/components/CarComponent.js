import BookingCardComponent from "./BookingCardComponent";

const CarComponent = ({ car }) => {
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
				return <BookingCardComponent booking={booking} />;
			})}
		</div>
	);
};

export default CarComponent;
