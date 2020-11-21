import React from "react";

const HotelCard = (props) => {
	const { title, specification, features, ratings, totalRating, price, imgUrl } = props.hotel;
	return (
		<div className="hotel-card d-flex my-4 align-items-lg-center">
			<div className="img mr-4">
				<img src={imgUrl} alt="" style={{width:"270px" , height: "200px"}} />
			</div>
			<div className="info">
				<h4>{title}</h4>
				<p>
					{specification.guest} guest, {specification.rooms} rooms, {specification.beds} beds,{" "}
					{specification.bathrooms} bathrooms
				</p>
				<p>{features[0]}</p>
				<p>{features[1]}</p>
				<p className="ratings d-flex">
					<small>
						<strong>
							{ratings}({totalRating})
						</strong>
					</small>
					<strong>${price}</strong>
					<del>$99 discount</del>
				</p>
			</div>
		</div>
	);
};

export default HotelCard;