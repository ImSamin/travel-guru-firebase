import React from "react";
import { Link, useParams } from "react-router-dom";
import fakeData from "../../fakeData/index";
import "./Booking.css";

const Booking = () => {
  let { id } = useParams();
  const bookingData = fakeData.find((item) => item.id === id);
  const { title, longDesc } = bookingData;
  return (
    <div className="main d-flex align-items-center justify-content-between">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>{title}</h1>
            <p>{longDesc}</p>
          </div>

          <div className="col-md-6 d-flex justify-content-end">
            <div className="booking-form">
              <div className="">
                <div className="form-group">
                  <label>Origin</label>
                  <input
                    type="text"
                    className="booking-input form-control"
                    placeholder="e.g Dhaka"
                  />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    className="booking-input form-control"
                    placeholder=""
                    defaultValue={title}
                  />
                </div>
                <div className="form-group row booking-date">
                  <div className="col-6">
                    <label htmlFor="date-input">From</label>
                    <input className="booking-input form-control" type="date" id="dateFrom" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="dateTo">To</label>
                    <input className="booking-input form-control" type="date" id="dateTo" />
                  </div>
                </div>
                <Link to="/destination">
                  <button
                    type="submit"
                    className="btn btn-warning tg-primary btn-block"
                  >
                    Start Booking
              </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
