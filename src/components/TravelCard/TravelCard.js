import React from "react";
import img from "../../images/resources/Image/sundorbon.png";
import { Link } from "react-router-dom";

const TravelCard = (props) => {
  const { title, id, imgUrl } = props.placeData;
  return (
    <div className="col-4">
      <Link to={`/booking/${id}`}>
        <div className="travelCard-img">
          <img src={imgUrl} style={{ width: "100%", height: "100%" }} alt="" />
          <h3>{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default TravelCard;
