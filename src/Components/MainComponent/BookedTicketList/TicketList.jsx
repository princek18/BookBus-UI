import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPopUp } from '../../../utlis/ErrorPopUp';
import { logout, requestAPI } from '../../../utlis/utils';
import './TicketList.css'

export const TicketList = () => {
    const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resData, setResData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let userId = localStorage.getItem('userId');
            document.getElementById("loader").style.display = "block";
            requestAPI('POST', '/getallticket', {userId}, null)
            .then((res) => {
                document.getElementById("loader").style.display = "none";
                setResData(res.data);
            })
            .catch((err) => {
                document.getElementById("loader").style.display = "none";
                setErrorMessage(err.response.data.message);
                setOpenErrorPoUp(true);
                if (err.response.data.message === "Authentication Failed.") {
                  logout();
                }
              })
    }, [])
    const handleClick = (ticketId) => {
        navigate('/ticket', {state: {ticketId}});
    }
  return (
    <>
    <div className="buslist">
      <h1>Booked Tickets:</h1>
      {resData.length> 0 ? resData.map((tkt) => {
        return(
          <div style={{cursor: "pointer"}} onClick={() => handleClick(tkt._id)} key={tkt._id} className="inner">
          <h2>Bus No. : {tkt.busNumber}</h2>
          <div className="one">
            {/* <p className="p-1">Bus Type: {busType}</p>
            <p className="p-1">Journey Class: {journeyClass}</p> */}
            <p className="p-1">Journey Date: {tkt.journeyDate}</p>
          </div>
          <div className="one">
            <p className="p-1">Origin: {tkt.origin}</p>
            <p className="p-1">Destination: {tkt.destination}</p>
            {/* <p className="p-1">Distance: {tkt.distance}</p> */}
          </div>
          <div className="one">
            {/* <p className="p-1">Departure Time: {tkt.departureTime}</p>
            <p className="p-1">Arrival Time: {tkt.arrivalTime}</p>
            <p className="p-1">Journey Time: {tkt.journeyTime}</p> */}
          </div>
          <div className="one">
            {/* <p className="p-1">Total Seats: {total}</p>
            <p className="p-1">Available Seats: {available}</p> */}
            <p className="p-1">Fare: ₹{tkt.fare}</p>
            <p className="p-1">Passenger(s): {tkt.passengers.length}</p>
          </div>
        </div>
        )
      }): <h1>No bookings available</h1>}
    </div>
        <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  )
}
