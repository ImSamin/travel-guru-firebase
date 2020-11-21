import React, { useEffect, useState } from "react";
import "./Home.css";
import data from "../../fakeData/index";
import TravelCard from "../TravelCard/TravelCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    setPlaceData(data);
  }, []);

  return (
    <main className="main d-flex align-items-center">
      <div className="row draken">
        <div className="col-md-5">
          <div className="container">
            <h1>Cox's bazar</h1>
            <p>
              Cox's Bazar is a city, fishing port, tourism centre and district
              headquarters in southeastern Bangladesh. It is famous mostly for
              its long natural sandy beach, and it ...
            </p>
            <Link to="/booking/Coxs-Bazar"><button className="btn-booking">Booking → </button>
            </Link>
          </div>
        </div>
        <div className="col-md-7">
          <div className="travelCard-images">
            <div className="row">
              {placeData.map((placeData) => (
                <TravelCard placeData={placeData}></TravelCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
