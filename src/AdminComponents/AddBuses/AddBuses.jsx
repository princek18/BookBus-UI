import { Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { SuccessPopUp } from "../../utlis/SuccessPopUp";
import { logout, requestAPI } from "../../utlis/utils";
import "./AddBuses.css";
import moment from "moment";

export const AddBuses = () => {
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [today, setToday] = useState("");

  const handleSubmit = (values) => {
      document.getElementById("loader").style.display = "block";
      requestAPI('POST', '/addbus', values, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        setSuccessMessage(res.data.message);
        setOpenSuccessPoUp(true);
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

  useEffect(() => {
    let k = moment().format('YYYY-MM-DD');
    setToday(k);
  }, [])
  return (
    <div className="back">
        <h2 style={{textAlign: "center"}}>Add Bus:</h2>
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
        style={{ display: "flex", justifyContent: "space-between" }}
          onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="div-f">
          <Form.Item
            label="Bus Number"
            name="busNumber"
            rules={[
              {
                required: true,
                message: "Please enter Bus Number!",
              },
            ]}
          >
            <Input placeholder="Bus No." />
          </Form.Item>

          <Form.Item
            label="Journey Time"
            name="journeyTime"
            rules={[
              {
                required: true,
                message: "Please enter Journey Time!",
              },
            ]}
          >
            <Input placeholder="Journey Time." />
          </Form.Item>
          <Form.Item
            label="Bus Type"
            name="busType"
            rules={[
              {
                required: true,
                message: "Please select Bus Type!",
              },
            ]}
          >
            <Select defaultValue="Option">
              <Select.Option value="A/C">A/C</Select.Option>
              <Select.Option value="Non-A/C">Non-A/C</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Distance"
            name="distance"
            rules={[
              {
                required: true,
                message: "Please enter Distance!",
              },
            ]}
          >
            <Input placeholder="Distance." />
          </Form.Item>
        </div>

        <div className="div-f">
          <Form.Item
            label="Origin"
            name="origin"
            rules={[
              {
                required: true,
                message: "Please enter Origin!",
              },
            ]}
          >
            <Input placeholder="Origin." />
          </Form.Item>

          <Form.Item
            label="Departure Time"
            name="departureTime"
            rules={[
              {
                required: true,
                message: "Please Enter Departure Time!",
              },
            ]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            label="Journey Class"
            name="journeyClass"
            rules={[
              {
                required: true,
                message: "Please select Journey Class!",
              },
            ]}
          >
            <Select defaultValue="Option">
              <Select.Option value="Sleeper">Sleeper</Select.Option>
              <Select.Option value="Seater">Seater</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please select Start Date!",
              },
            ]}
          >
            <Input min={today} type="date" />
          </Form.Item>
          <div style={{textAlign: "center", marginTop: "20px"}}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </div>

        <div className="div-f">
          <Form.Item
            label="Destination"
            name="destination"
            rules={[
              {
                required: true,
                message: "Please enter Destination!",
              },
            ]}
          >
            <Input placeholder="Destination." />
          </Form.Item>

          <Form.Item
            label="Arrival Time"
            name="arrivalTime"
            rules={[
              {
                required: true,
                message: "Please enter Arrival Time!",
              },
            ]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            label="Fare"
            name="fare"
            rules={[
              {
                required: true,
                message: "Please enter fare!",
              },
            ]}
          >
            <Input placeholder="Fare." type="number" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please select End Date!",
              },
            ]}
          >
            <Input min={today} type="date" />
          </Form.Item>
        </div>

      </Form>
      <SuccessPopUp
        message={successMessage}
        open={openSuccessPopUp}
        setOpen={setOpenSuccessPoUp}
      />
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </div>
  );
};
