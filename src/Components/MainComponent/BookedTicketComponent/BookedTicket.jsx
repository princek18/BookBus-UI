import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPopUp } from '../../../utlis/ErrorPopUp';
import { logout, requestAPI } from '../../../utlis/utils';
import './BookedTicket.css'

export const BookedTicket = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resData, setResData] = useState([]);

    useEffect(() => {
        document.getElementById("loader").style.display = "block";
        if (setErrorMessage) {
          requestAPI('POST', '/getticket', state, null)
          .then((res) => {
              document.getElementById("loader").style.display = "none";
              setResData(res.data);
          })
          .catch((err) => {
              document.getElementById("loader").style.display = "none";
              console.log(err);
              setErrorMessage(err.response.data.message);
              setOpenErrorPoUp(true);
              if (err.response.data.message === "Authentication Failed.") {
                logout();
              }
            });
        }
    }, [])

    const handleClick = () => {
      navigate('/');
    }
    const print = () => {
      window.print();
    }
  return (
      <>
        {resData.bus && resData.ticket ?
            <div className="back">
        <h2 style={{ textAlign: "center" }}>Ticket Booked:</h2>
        <div className="tkt-head">
          <h2>Bus No. : {resData.bus.busNumber}</h2>
        </div>
        <div className="tkt-body">
          <div className="one">
            <p className="p-1">Bus Type: {resData.bus.busType}</p>
            <p className="p-1">Journey Class: {resData.bus.journeyClass}</p>
            <p className="p-1">Journey Date: {resData.ticket.journeyDate}</p>
          </div>
          <div className="one">
            <p className="p-1">Origin: {resData.bus.origin}</p>
            <p className="p-1">Destination: {resData.bus.destination}</p>
            <p className="p-1">Distance: {resData.bus.distance}</p>
          </div>
          <div className="one">
            <p className="p-1">Departure Time: {resData.bus.departureTime}</p>
            <p className="p-1">Arrival Time: {resData.bus.arrivalTime}</p>
            <p className="p-1">Journey Time: {resData.bus.journeyTime}</p>
          </div>
          <div className="one">
            <p className="p-1">Total Fare: ₹{resData.ticket.fare}</p>
            <p className="p-1">Seat(s): {resData.ticket.seats.join(", ")}</p>
          </div>
        </div>
        <div className="tkt-pass">
          <h2>Passenger(s) Details:</h2>
          {resData.ticket.passengers.map((one, index) => {
            return (
              <div className="pass" key={one.name}>
                <h3>Passenger: {index + 1}</h3>
                <div className="pass-1">
                  <p className="p-1">Name: {one.name}</p>
                  <p className="p-1">Age: {one.age}</p>
                  <p className="p-1">Gender: {one.gender}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="tkt-btn">
          <Button onClick={handleClick} variant="contained">
            Book another Ticket
          </Button>
          <Button style={{marginLeft: "20px"}} onClick={print} variant="contained">
            Print Ticket
          </Button>
        </div>

        </div>: null
      }
    <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  )
}
