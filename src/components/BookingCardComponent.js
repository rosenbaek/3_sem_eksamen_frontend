const BookingCardComponent = ({ booking }) => {
	return (
		<div
			style={{
				padding: 20,
				margin: 10,
				backgroundColor: "grey",
				minWidth: "300px",
				borderRadius: 7,
			}}
		>
			<h6>{booking.dateTime}</h6>
			<p>Duration: {booking.duration}</p>
			<p>Assistants:</p>
			<ul>
				{booking.washingAssistants.map((assistant) => {
					return <li>{assistant.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default BookingCardComponent;
