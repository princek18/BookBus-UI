import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SeatSelection } from "../SeatSelection/SeatSelection";
import "./BusList.css";

export const BusList = () => {
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busData, setBusData] = useState("");
  const { user, buses } = state;
  const { busType, destination, journeyClass, journeyDate, origin } = user;

  const handleClick = (bus) => {
    setIsModalOpen(true);
    setBusData(bus);
  }

  return (
    <>
    <div className="buslist">
      <h1>Available Buses:</h1>
      {buses.map((bus) => {
        let total = 0;
        let available = 0;
        for (const key in bus.availableTickets) {
          total += 1;
          if (bus.availableTickets[key] === "false") {
            available += 1;
          }
        }
        return(
          <div style={{cursor: "pointer"}} onClick={() => handleClick(bus)} key={bus.id} className="inner">
          <h2>Bus No. : {bus.busNumber}</h2>
          <div className="one">
            <p className="p-1">Bus Type: {busType}</p>
            <p className="p-1">Journey Class: {journeyClass}</p>
            <p className="p-1">Journey Date: {journeyDate}</p>
          </div>
          <div className="one">
            <p className="p-1">Origin: {origin}</p>
            <p className="p-1">Destination: {destination}</p>
            <p className="p-1">Distance: {bus.distance} KM</p>
          </div>
          <div className="one">
            <p className="p-1">Departure Time: {bus.departureTime}</p>
            <p className="p-1">Arrival Time: {bus.arrivalTime}</p>
            <p className="p-1">Journey Time: {bus.journeyTime}</p>
          </div>
          <div className="one">
            <p className="p-1">Total Seats: {total}</p>
            <p className="p-1">Available Seats: {available}</p>
            <p className="p-1">Fare: ₹{bus.fare}</p>
          </div>
        </div>
        )
      })}
      <Link to="/">
      <Button variant="contained" color="primary">
        Back
      </Button></Link>
    </div>
    <SeatSelection setIsModalOpen={setIsModalOpen} user={user} bus={busData} IsModalOpen={isModalOpen}/>
    </>
  );
};
