import React, { useEffect, useState } from "react";
import "./SearchBus.css";
import { Button, Input } from "antd";
import { default as ReactSelect } from "react-select";
import { RiArrowUpDownLine } from "react-icons/ri";
import { logout, requestAPI } from "../../../utlis/utils";
import { ErrorPopUp } from "../../../utlis/ErrorPopUp";
import { useNavigate } from "react-router-dom";

export const SearchBus = () => {
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userForm, setUserForm] = useState({
    origin: "",
    destination: "",
    busType: "",
    journeyDate: "",
    journeyClass: "",
  });
  const [error, setError] = useState({
    origin: false,
    destination: false,
    busType: false,
    journeyDate: false,
    journeyClass: false,
  });
  const [validationMessage, setValidationMessage] = useState("");
  const [resData, setResData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("loader").style.display = "block";
    requestAPI('GET', '/getdropdwonvalues', null, null)
    .then((res) => {
      document.getElementById("loader").style.display = "none";
      let responseData = res.data;
      setResData(responseData);
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

  const CustomStyle = {
    option: (base) => ({
      ...base,
      textAlign: "left",
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: "left",
    }),
    control: (base) => ({
      ...base,
      border: "1px solid #9ea1ae",
      height: "35px",
      minHeight: "35px",
    }),
    valueContainer: (base) => ({
      ...base,
      paddingTop: "0px",
      margin: "0px",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      height: "0px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      paddingTop: "0px",
      marginTop: "0px",
    }),
    input: (base) => ({
      ...base,
      paddingTop: "0px",
      marginTop: "0px",
    }),
    singleValue: (base) => ({
      ...base,
      margin: "0px",
      textAlign: "left",
    }),
  };

  const handleChange = {
    origin: (e) => {
      setUserForm({
        ...userForm,
        origin: e
      })
    },
    destination: (e) => {
      setUserForm({
        ...userForm,
        destination: e
      })
    },
    busType: (e) => {
      setUserForm({
        ...userForm,
        busType: e
      })
    },
    journeyClass: (e) => {
      setUserForm({
        ...userForm,
        journeyClass: e
      })
    },
    journeyDate: (e) => {
      setUserForm({
        ...userForm,
        [e.target.name]: e.target.value
      })
    },
  }
  const exchange = () => {
    let data = userForm.origin;
    let data2 = userForm.destination;
    setUserForm({
      ...userForm,
      origin: data2,
      destination: data
    })
  }

  const handleSubmit = () => {
    for (const err in error) {
      error[err] = false;
    };
    setValidationMessage("");
    if (userForm.origin === null || userForm.origin === "") {
      setValidationMessage("Please select origin!");
      setError({
        ...error,
        origin: true
      })
    }
    else if (userForm.destination === null || userForm.destination === "") {
      setValidationMessage("Please select destination!");
      setError({
        ...error,
        destination: true
      })
    }
    else if (userForm.origin.value === userForm.destination.value) {
      setValidationMessage("Origin and Destination can't be same!");
      setError({
        ...error,
        origin: true,
        destination: true
      })
    }
    else if (userForm.busType === null || userForm.busType === "") {
      setValidationMessage("Please select Bus Type!");
      setError({
        ...error,
        busType: true
      })
    }
    else if (userForm.journeyClass === null || userForm.journeyClass === "") {
      setValidationMessage("Please select journey Class!");
      setError({
        ...error,
        journeyClass: true
      })
    }
    else if (userForm.journeyDate === null || userForm.journeyDate === "") {
      setValidationMessage("Please select journey Date!");
      setError({
        ...error,
        journeyDate: true
      })
    }
    else{
      document.getElementById("loader").style.display = "block";
      let data = {
        busType: userForm.busType.value,
        destination: userForm.destination.value,
        journeyClass: userForm.journeyClass.value,
        journeyDate: userForm.journeyDate,
        origin: userForm.origin.value
      }
      requestAPI("POST", "/searchbuses", data, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        navigate('/search', {state: res.data})
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data.message === "Authentication Failed.") {
          logout();
        }
      })
    }
  }

  return (
    <>
    <div>
      <div className="search">
        <h1 className="login">Search Buses</h1>
        <p style={{color: "red"}}>{validationMessage}</p>
        <div className="size-2">
          <label style={error.origin? {color: "red"}: null} htmlFor="origin">Origin:</label>
          <ReactSelect
            styles={CustomStyle}
            placeholder="Select Origin.."
            id="origin"
            options={resData.location}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={handleChange.origin}
            value={userForm.origin}
          />
        </div>
        <div style={{textAlign: "center"}}>
        <RiArrowUpDownLine style={{cursor: "pointer"}} onClick={exchange} size="1.5rem"/>
        </div>
        <div className="size-2">
          <label style={error.destination? {color: "red"}: null} htmlFor="destination">Destination:</label>
          <ReactSelect
            styles={CustomStyle}
            placeholder="Select Destination.."
            id="destination"
            options={resData.location}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={handleChange.destination}
            value={userForm.destination}
          />
        </div>
        <div className="size-2" style={{ display: "flex"}}>
          <div style={{ width: "47%", marginRight: "6%"}}>
            <label style={error.busType? {color: "red"}: null} htmlFor="busType">Bus Type:</label>
            <ReactSelect
              styles={CustomStyle}
              placeholder="Select Bus.."
              id="busType"
              options={resData.busType}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              onChange={handleChange.busType}
              value={userForm.busType}
            />
          </div>
          <div style={{ width: "47%"}}>
            <label style={error.journeyClass? {color: "red"}: null} htmlFor="jorneyClass">Journey Class:</label>
            <ReactSelect
              styles={CustomStyle}
              placeholder="Select Class.."
              id="journeyClass"
              options={resData.journeyClass}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              onChange={handleChange.journeyClass}
              value={userForm.journeyClass}
            />
          </div>
        </div>
        <div style={{ width: "47%" }}>
            <label style={error.journeyDate? {color: "red"}: null} htmlFor="jorneyDate">Date of Journey:</label>
            <Input id="journeyDate" onChange={handleChange.journeyDate} name="journeyDate" type="date" value={userForm.journeyDate} />
          </div>
        <Button style={{ width: "100%", marginTop: "20px"}} type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
    <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};
