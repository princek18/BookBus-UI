import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorPopUp } from "../../../utlis/ErrorPopUp";
import { logout, requestAPI } from "../../../utlis/utils";
import { ImCross } from "react-icons/im";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./ReviewTicket.css";

const PassModal = ({
  isOpenPassModal,
  setIsOpenPassModal,
  handleSubmit,
  password,
  setPassword,
}) => {
  const style = {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleInput = (e) => {
    setPassword(e.target.value);
  };
  const handleClose = () => {
    setIsOpenPassModal(false);
  };

  return (
    <Modal open={isOpenPassModal}>
      <Box sx={{ ...style, width: 350 }}>
        <ImCross className="cross" size="1.5em" onClick={handleClose} />
        <h2 style={{ margin: "auto" }}>Verify</h2>
        <div style={{ margin: "20px 0px" }}>
          <h3>Please enter password to book your ticket:</h3>
          <TextField
            id="outlined-number"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
            InputLabelProps={{
              shrink: true,
            }}
            error={password === ""}
          />
        </div>
        <Button color="warning" variant="contained" onClick={handleSubmit}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export const ReviewTicket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { passengers, user, bus, selectedSeat } = state;
  const { busType, destination, journeyClass, journeyDate, origin } = user;
  const [price, setPrice] = useState("");
  const [wallet, setWallet] = useState("");
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenPassModal, setIsOpenPassModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setPrice(bus.fare * selectedSeat.length);
    document.getElementById("loader").style.display = "block";
    requestAPI("GET", "/getwallet", null, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        setWallet(res.data.walletBalance);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data.message === "Authentication Failed.") {
          logout();
        }
      });
  }, []);

  const checkBooking = () => {
    if (price > wallet) {
      setErrorMessage("Insufficient wallet balance!");
      setOpenErrorPoUp(true);
    } else {
      setIsOpenPassModal(true);
    }
  };

  const handleSubmit = () => {
    if (password !== "") {
      setIsOpenPassModal(false);
      setPassword("");
      document.getElementById("loader").style.display = "block";
      let data = {
        busId: bus.id,
        journeyDate,
        fare: price,
        password,
        seats: selectedSeat,
        passengers
      }
      requestAPI("POST", "/bookticket", data, null)
        .then((res) => {
          document.getElementById("loader").style.display = "none";
          navigate('/ticket', {state: res.data})
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          setErrorMessage(err.response.data.message);
          setOpenErrorPoUp(true);
          if (err.response.data.message === "Authentication Failed.") {
            logout();
          }
        });
    }
  };
  return (
    <>
      <div className="back">
        <h2 style={{ textAlign: "center" }}>Review Details:</h2>
        <div className="tkt-head">
          <h2>Bus No. : {bus.busNumber}</h2>
        </div>
        <div className="tkt-body">
          <div className="one">
            <p className="p-1">Bus Type: {busType}</p>
            <p className="p-1">Journey Class: {journeyClass}</p>
            <p className="p-1">Journey Date: {journeyDate}</p>
          </div>
          <div className="one">
            <p className="p-1">Origin: {origin}</p>
            <p className="p-1">Destination: {destination}</p>
            <p className="p-1">Distance: {bus.distance}</p>
          </div>
          <div className="one">
            <p className="p-1">Departure Time: {bus.departureTime}</p>
            <p className="p-1">Arrival Time: {bus.arrivalTime}</p>
            <p className="p-1">Journey Time: {bus.journeyTime}</p>
          </div>
          <div className="one">
            <p className="p-1">Total Fare: ₹{price}</p>
            <p className="p-1">Tickets booked: {selectedSeat.length}</p>
            <p className="p-1">Seats: {selectedSeat.join(", ")}</p>
          </div>
        </div>
        <div className="tkt-pass">
          <h2>Passenger(s) Details:</h2>
          {passengers.map((one, index) => {
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
        <div className="tkt-pay">
          <h2>Payment:</h2>
          <div className="pay">
            <h3>Current Balance in Wallet: ₹{wallet}</h3>
            <h3>Amount to be deducted: ₹{price}</h3>
          </div>
        </div>
        <div className="tkt-btn">
          <Button onClick={checkBooking} variant="contained">
            Book Ticket
          </Button>
        </div>
      </div>
      <PassModal
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isOpenPassModal={isOpenPassModal}
        setIsOpenPassModal={setIsOpenPassModal}
      />
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};
