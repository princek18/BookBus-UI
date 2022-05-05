import React, { useEffect, useState } from "react";
import "./SeatSelection.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";

export const SeatSelection = ({
  IsModalOpen,
  journeyClass,
  busType,
  bus,
  setIsModalOpen,
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
  const [leftSeat, setLeftSeat] = useState({});
  const [rightSeat, setRightSeat] = useState({});
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let {availableTickets} = bus;
    let data1 = {};
    let data2 = {};
    for (const key in availableTickets) {
        if (key[0] === "L") {
          data1[key] = availableTickets[key];
        } else {
          data2[key] = availableTickets[key];
        }
      }
      setLeftSeat(data1);
      setRightSeat(data2);
      setSelectedSeat([]);
      setError("");
  }, [IsModalOpen, bus]);


  const handleClose = () => {
    setIsModalOpen(false);
  };

  const selectSeat = (seat) => {
      setError("");
      let data1 = {};
      let data2 = {};
      let selected = [...selectedSeat];
      if (selected.length === 4 && (leftSeat[seat] === "false" || rightSeat[seat] === "false")) {
        setError("Can not book more than 4 at once!");
      }
      else{
      if (seat in leftSeat) {
        data1 = {...leftSeat};
          if (leftSeat[seat] === "true") {
            data1[seat] = "false";
              selected = selected.filter((one) => one !== seat);
          }
          else{
              data1[seat] = "true";
              selected.push(seat);
          }
      setLeftSeat(data1);
      }
      else{
        data2 = {...rightSeat};
        if (rightSeat[seat] === "true") {
        data2[seat] = "false";
            selected = selected.filter((one) => one !== seat);
        }
        else{
            data2[seat] = "true"
            selected.push(seat);
        }
        setRightSeat(data2);
      }
    }
    setSelectedSeat(selected);
  };

  return (
    <>
      <Modal open={IsModalOpen}>
        <Box sx={{ ...style, width: "60%" }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h1 style={{ margin: "auto" }}>Select Seat(s):</h1>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
            <h3>Class: {journeyClass}</h3>
            <h3>Selected Seat(s): {selectedSeat.length}</h3>
            <h3>Bus Type: {busType}</h3>
          </div>
          <div className="inst" >
              <div className="inst">
              <div className="seat"/>
                <h3 style={{margin: "auto", marginLeft: "5px"}}>Available</h3>
              </div>
              <div className="inst"> 
              <div style={{background: "gray"}} className="seat"/>
              <h3 style={{margin: "auto", marginLeft: "5px"}}>Selected</h3>
              </div>
              <div className="inst">
              <div style={{background: "#D3D3D3"}} className="seat"/>
                <h3 style={{margin: "auto", marginLeft: "5px"}}>Booked</h3>
              </div>
          </div>
          <p style={{color: "red", marginTop: "5%"}}>{error}</p>
          <div className="bus-body">
            <div className="front-bus">Front</div>
            <div className="back-bus">
              <div className="seat-height">
                <div className="seat-list">
                    {Object.keys(leftSeat).map((one) => {
                    return (
                      <div
                      onClick={leftSeat[one] !== "booked"? () => selectSeat(one): null}
                        key={one}
                        className="seat"
                        style={leftSeat[one] === "true"? {background: "gray", color: "white"}:leftSeat[one] === "booked"? {background: "#D3D3D3", color: "white", cursor: "auto"}  :null}
                      >
                        {one}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="seat-height">
                <div className="seat-list">
                {Object.keys(rightSeat).map((one) => {
                    return (
                      <div
                        onClick={rightSeat[one] !== "booked"? () => selectSeat(one): null}
                        key={one}
                        className="seat"
                        style={rightSeat[one] === "true"? {background: "gray", color: "white"}:rightSeat[one] === "booked"? {background: "#D3D3D3", color: "white", cursor: "auto"}  :null}
                      >
                        {one}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
