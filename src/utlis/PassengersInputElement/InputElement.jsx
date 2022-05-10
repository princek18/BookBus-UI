import { MenuItem, TextField } from "@mui/material";
import React from "react";
import "./InputElement.css";

export const InputElement = (userForm, setUserForm) => {
  const genderList = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      style={{ background: "aliceblue", padding: "10px", marginBottom: "20px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <TextField
        error={userForm.name === ""}
          name="name"
          onChange={handleChange}
          value={userForm.name}
          id="outlined"
          label="Name"
        />
        <br />
        <TextField
        error={userForm.age === ""}
          name="age"
          onChange={handleChange}
          value={userForm.age}
          type="number"
          id="outlined"
          label="Age"
        />
        <br />
        <TextField
        error={userForm.gender === ""}
          name="gender"
          onChange={handleChange}
          value={userForm.gender}
          select
          id="outlined"
          label="Gender"
        >
          {genderList.map((one) => {
            return (
              <MenuItem key={one.value} value={one.value}>
                {one.label}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
    </div>
  );
};
