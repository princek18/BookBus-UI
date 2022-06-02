import React, { useEffect, useState } from "react";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { logout, requestAPI } from "../../utlis/utils";
import "./AdminBusList.css";
import { Button, Form, Input } from "antd";
import { DeletePopUp } from "../DeletePopUp/DeletePopUP";
import { Box, Modal } from "@mui/material";
import { ImCross } from "react-icons/im";
import moment from "moment";
import { SuccessPopUp } from "../../utlis/SuccessPopUp";

const BookingDate = ({
  IsModalOpen,
  setIsModalOpen,
  date,
  busId
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
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onDone = (value) => {
    let data = {extensionDate: value.extensionDate, newDate: date, busId}
    document.getElementById("loader").style.display = "block";
    requestAPI('PUT', '/extension', data, null)
    .then((res) => {
      document.getElementById("loader").style.display = "none";
      setSuccessMessage(res.data.message);
      setOpenSuccessPoUp(true);
      setIsModalOpen(false);
  })
  .catch((err) => {
      document.getElementById("loader").style.display = "none";
      setErrorMessage(err.response.data.message);
      setOpenErrorPoUp(true);
      if (err.response.data.message === "Authentication Failed.") {
        logout();
      }
    });
  };

  return (
    <>
      <Modal open={IsModalOpen}>
        <Box sx={{ ...style, width: 400 }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h2 style={{ margin: "auto" }}>Extension Date</h2>
          <div style={{ margin: "20px 0px" }}>
            <h3>Select Date for Extension:</h3>
          </div>
          <Form
            className="frm"
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onDone}
            autoComplete="off"
          >
            <Form.Item
              name="extensionDate"
              rules={[
                {
                  required: true,
                  message: "Please select date!",
                },
              ]}
            >
              <Input min={date} type="date" />
            </Form.Item>
            <div style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Extend
              </Button>
            </div>
          </Form>
        </Box>
      </Modal>
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
        <SuccessPopUp
        message={successMessage}
        open={openSuccessPopUp}
        setOpen={setOpenSuccessPoUp}
      />
    </>
  );
};

export const AdminBusList = () => {
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buses, setBuses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteBus, setDeleteBus] = useState("");
  const [opneDateModal, setOpenDateModal] = useState(false);
  const [busId, setBusId] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    document.getElementById("loader").style.display = "block";
    requestAPI("GET", "/getallbuses", null, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        setBuses(res.data.buses);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data.message === "Authentication Failed.") {
          logout();
        }
      });
  }, [modalOpen, opneDateModal]);


  const handleClick = (bus) => {
    setModalOpen(true);
    setDeleteBus(bus);
  };

  const handleModal = (bus) => {
    let k = moment(bus.tickets, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");
    setNewDate(k);
    setOpenDateModal(true);
    setBusId(bus._id);
  };

  return (
    <>
      <div className="buslist">
        <h1>Total Buses: {buses.length}</h1>
        {buses.length > 0 &&
          buses.map((bus) => {
            return (
              <div key={bus._id} className="inner">
                <h2>Bus No. : {bus.busNumber}</h2>
                <div className="one">
                  <p className="p-1">Bus Type: {bus.busType}</p>
                  <p className="p-1">Journey Class: {bus.journeyClass}</p>
                  <p className="p-1">Fare: ₹{bus.fare}</p>
                </div>
                <div className="one">
                  <p className="p-1">Origin: {bus.origin}</p>
                  <p className="p-1">Destination: {bus.destination}</p>
                  <p className="p-1">Distance: {bus.distance} KM</p>
                </div>
                <div className="one">
                  <p className="p-1">Departure Time: {bus.departureTime}</p>
                  <p className="p-1">Arrival Time: {bus.arrivalTime}</p>
                  <p className="p-1">Journey Time: {bus.journeyTime}</p>
                </div>
                <div className="one">
                  <p className="p-1">Booking Allowed: {bus.tickets}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleModal(bus)}
                    type="primary"
                  >
                    Extend Booking
                  </Button>
                  <Button
                    onClick={() => handleClick(bus)}
                    style={{ marginLeft: "20px" }}
                    type="primary"
                    danger
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <BookingDate
        IsModalOpen={opneDateModal}
        setIsModalOpen={setOpenDateModal}
        date={newDate}
        busId={busId}
      />
      <DeletePopUp
        data={deleteBus}
        IsModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
        label="Bus"
      />
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};
