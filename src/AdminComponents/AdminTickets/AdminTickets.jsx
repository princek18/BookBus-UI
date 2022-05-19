import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { logout, requestAPI } from "../../utlis/utils";
import { DeletePopUp } from "../DeletePopUp/DeletePopUP";
import "./AdminTickets.css";

export const AdminTickets = () => {
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resData, setResData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTicket, setDeleteTicket] = useState("");

  useEffect(() => {
    document.getElementById("loader").style.display = "block";
    requestAPI("GET", "/getalltickets", null, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        setResData(res.data.tickets);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data.message === "Authentication Failed.") {
          logout();
        }
      });
  }, [modalOpen]);

  const handleClick = (tkt) => {
    setModalOpen(true);
    setDeleteTicket(tkt);
  };
  return (
    <>
      <div className="buslist">
        <h1>All Tickets:</h1>
        {resData.length > 0 ? (
          resData.map((tkt) => {
            return (
              <div key={tkt._id} className="inner">
                <h2>Bus No. : {tkt.busNumber}</h2>
                <div className="one">
                  <p className="p-1">Journey Date: {tkt.journeyDate}</p>
                  <p className="p-1">Seats: {tkt.seats.join(", ")}</p>
                </div>
                <div className="one">
                  <p className="p-1">Origin: {tkt.origin}</p>
                  <p className="p-1">Destination: {tkt.destination}</p>
                </div>
                <div className="one">
                  <p className="p-1">Fare: ₹{tkt.fare}</p>
                  <p className="p-1">Passenger(s): {tkt.passengers.length}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleClick(tkt)}
                    style={{ marginLeft: "20px" }}
                    type="primary"
                    danger
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No ticket available</h1>
        )}
      </div>
      <DeletePopUp
        data={deleteTicket}
        IsModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
        label="Ticket"
      />
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};
