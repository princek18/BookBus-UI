import React, { useEffect, useState } from "react";
import "./SeatSelection.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";
import { InputElement } from "../../../utlis/PassengersInputElement/InputElement";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SeatSelection = ({
  IsModalOpen,
  user,
  bus,
  setIsModalOpen,
}) => {
  const { journeyClass, busType } = user;
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
  const navigate = useNavigate();
  const [upSeat, setUpSeat] = useState({});
  const [downSeat, setDownSeat] = useState({});
  const [leftSeat, setLeftSeat] = useState({});
  const [rightSeat, setRightSeat] = useState({});
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [passenger1, setPassenger1] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [passenger2, setPassenger2] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [passenger3, setPassenger3] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [passenger4, setPassenger4] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const passengers = {
    passenger1,
    passenger2,
    passenger3,
    passenger4
  };

  useEffect(() => {
    let { availableTickets } = bus;
    if (journeyClass === "Sleeper") {
      let data1 = {};
      let data2 = {};
      for (const key in availableTickets) {
        if (key[0] === "U") {
          data1[key] = availableTickets[key];
        } else {
          data2[key] = availableTickets[key];
        }
      }
      setUpSeat(data1);
      setDownSeat(data2);
    } else if (journeyClass === "Seater") {
      let data3 = {};
      let data4 = {};
      for (const key in availableTickets) {
        if (key[0] === "L") {
          data3[key] = availableTickets[key];
        } else {
          data4[key] = availableTickets[key];
        }
      }
      setRightSeat(data4);
      setLeftSeat(data3);
    }
    setSelectedSeat([]);
    setError("");
    setError2("");
  }, [IsModalOpen, bus, journeyClass]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const selectSeat = (seat) => {
    setError("");
    setError2("");
    let selected = [...selectedSeat];
    let data1 = {};
    let data2 = {};
    if (journeyClass === "Sleeper") {
      if (
        selected.length === 4 &&
        (upSeat[seat] === "false" || downSeat[seat] === "false")
      ) {
        setError("Can not book more than 4 at once!");
      } else {
        if (seat in upSeat) {
          data1 = { ...upSeat };
          if (upSeat[seat] === "true") {
            data1[seat] = "false";
            selected = selected.filter((one) => one !== seat);
          } else {
            data1[seat] = "true";
            selected.push(seat);
          }
          setUpSeat(data1);
        } else {
          data2 = { ...downSeat };
          if (downSeat[seat] === "true") {
            data2[seat] = "false";
            selected = selected.filter((one) => one !== seat);
          } else {
            data2[seat] = "true";
            selected.push(seat);
          }
          setDownSeat(data2);
        }
      }
    } else if (journeyClass === "Seater") {
      if (
        selected.length === 4 &&
        (leftSeat[seat] === "false" || rightSeat[seat] === "false")
      ) {
        setError("Can not book more than 4 at once!");
      } else {
        if (seat in rightSeat) {
          data1 = { ...rightSeat };
          if (rightSeat[seat] === "true") {
            data1[seat] = "false";
            selected = selected.filter((one) => one !== seat);
          } else {
            data1[seat] = "true";
            selected.push(seat);
          }
          setRightSeat(data1);
        } else {
          data2 = { ...leftSeat };
          if (leftSeat[seat] === "true") {
            data2[seat] = "false";
            selected = selected.filter((one) => one !== seat);
          } else {
            data2[seat] = "true";
            selected.push(seat);
          }
          setLeftSeat(data2);
        }
      }
    }
    setSelectedSeat(selected);
  };

  let InputField = [
    InputElement(passenger1, setPassenger1),
    InputElement(passenger2, setPassenger2),
    InputElement(passenger3, setPassenger3),
    InputElement(passenger4, setPassenger4),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let PassengersDeatil = [];
    for (let i = 0; i < selectedSeat.length; i++) {
      PassengersDeatil.push(passengers[`passenger${i+1}`]);
    }
    let error = false;
    for (let i = 0; i < PassengersDeatil.length; i++) {
      if (PassengersDeatil[i].name === "" || PassengersDeatil[i].age === "" || PassengersDeatil[i].gender === "") {
        error = true;
        break;
      } 
    }
    if (error) {
      setError2("All fields are Mandatory!")
    }
    else{
      navigate('/review', {state: {passengers: PassengersDeatil, user, bus, selectedSeat}})
    }
  };
  return (
    <>
      <Modal open={IsModalOpen}>
        <Box
          sx={{ ...style, width: "60%", height: "500px", overflowY: "auto" }}
        >
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h1 style={{ margin: "auto" }}>Select Seat(s):</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <h3>Class: {journeyClass}</h3>
            <h3>Selected Seat(s): {selectedSeat.length}</h3>
            <h3>Bus Type: {busType}</h3>
          </div>
          <div className="inst">
            <div className="inst">
              <div className={journeyClass === "Sleeper" ? "sleep" : "seat"} />
              <h3 style={{ margin: "auto", marginLeft: "5px" }}>Available</h3>
            </div>
            <div className="inst">
              <div
                style={{ background: "gray" }}
                className={journeyClass === "Sleeper" ? "sleep" : "seat"}
              />
              <h3 style={{ margin: "auto", marginLeft: "5px" }}>Selected</h3>
            </div>
            <div className="inst">
              <div
                style={{ background: "#D3D3D3" }}
                className={journeyClass === "Sleeper" ? "sleep" : "seat"}
              />
              <h3 style={{ margin: "auto", marginLeft: "5px" }}>Booked</h3>
            </div>
          </div>
          <p style={{ color: "red", marginTop: "5%" }}>{error}</p>
          <div className="bus-body">
            <div className="front-bus">Front</div>
            <div className="back-bus">
              <div className="seat-height">
                {journeyClass === "Sleeper" ? (
                  <div className="sleep-list">
                    {Object.keys(upSeat).map((one) => {
                      return (
                        <div
                          onClick={
                            upSeat[one] !== "booked"
                              ? () => selectSeat(one)
                              : null
                          }
                          key={one}
                          className="sleep"
                          style={
                            upSeat[one] === "true"
                              ? { background: "gray", color: "white" }
                              : upSeat[one] === "booked"
                              ? {
                                  background: "#D3D3D3",
                                  color: "white",
                                  cursor: "auto",
                                }
                              : null
                          }
                        >
                          {one}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="seat-list">
                    {Object.keys(rightSeat).map((one) => {
                      return (
                        <div
                          onClick={
                            rightSeat[one] !== "booked"
                              ? () => selectSeat(one)
                              : null
                          }
                          key={one}
                          className="seat"
                          style={
                            rightSeat[one] === "true"
                              ? { background: "gray", color: "white" }
                              : rightSeat[one] === "booked"
                              ? {
                                  background: "#D3D3D3",
                                  color: "white",
                                  cursor: "auto",
                                }
                              : null
                          }
                        >
                          {one}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="seat-height">
                {journeyClass === "Sleeper" ? (
                  <div className="sleep-list">
                    {Object.keys(downSeat).map((one) => {
                      return (
                        <div
                          onClick={
                            downSeat[one] !== "booked"
                              ? () => selectSeat(one)
                              : null
                          }
                          key={one}
                          className="sleep"
                          style={
                            downSeat[one] === "true"
                              ? { background: "gray", color: "white" }
                              : downSeat[one] === "booked"
                              ? {
                                  background: "#D3D3D3",
                                  color: "white",
                                  cursor: "auto",
                                }
                              : null
                          }
                        >
                          {one}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="seat-list">
                    {Object.keys(leftSeat).map((one) => {
                      return (
                        <div
                          onClick={
                            leftSeat[one] !== "booked"
                              ? () => selectSeat(one)
                              : null
                          }
                          key={one}
                          className="seat"
                          style={
                            leftSeat[one] === "true"
                              ? { background: "gray", color: "white" }
                              : leftSeat[one] === "booked"
                              ? {
                                  background: "#D3D3D3",
                                  color: "white",
                                  cursor: "auto",
                                }
                              : null
                          }
                        >
                          {one}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {selectedSeat.length > 0 ? (
            <>
              <h2 style={{ marginTop: "20px" }}>Passenger(s) details:</h2>
              <p style={{ color: "red", marginTop: "5%" }}>{error2}</p>
              <form onSubmit={handleSubmit}>
                {selectedSeat.map((one, index) => {
                  return (
                    <React.Fragment key={index}>
                      <h3>Passenger {index + 1}:</h3>
                      {InputField[index]}
                    </React.Fragment>
                  );
                })}
                <Button type="submit" variant="contained">
                  Continue
                </Button>
              </form>
            </>
          ) : null}
        </Box>
      </Modal>
    </>
  );
};
