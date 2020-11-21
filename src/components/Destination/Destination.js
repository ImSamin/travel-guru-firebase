import React from "react";
import { hotelsInfo } from "../../fakeData/hotelsInfo";
import HotelCard from "../HotelCard/HotelCard";



const Destination = () => {
	return (
		<div className="tg-destination container">
			<div className="section-top text-left pt-3">
				<h4>252 stays Apr 13-17 3 guests</h4>
				<h3>Stay in Cox’s Bazar</h3>
			</div>
			<div className="row">
				<div className="col-lg-7">
					<div className="hotel-card-wrap mb-lg-0 mb-4">
						{hotelsInfo.map((hotel) => (
							<HotelCard hotel={hotel}></HotelCard>
						))}
					</div>
				</div>
				<div className="col-lg-5">
					
				</div>
			</div>
		</div>
	);
};

export default Destination;
