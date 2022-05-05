import { Button } from "@mui/material";
import React from "react";
import { logout } from "../../utlis/utils";
import "./Header.css";
import { Link } from "react-router-dom";

export const Header = ({ setUrlHref, urlHref, wallet }) => {
  const changeURL = () => {
    setUrlHref(!urlHref);
  };
  return (
    <header className="head">
      <Link to='/'><h2 style={{ margin: "0px", marginLeft: "10px" }}>BookBus</h2></Link>
      {localStorage.getItem("authToken") ? (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/wallet">
            <div onClick={changeURL} style={{ marginLeft: "10px" }}>
              Wallet Balance: ₹{wallet}
            </div>
          </Link>
          <Link to="/mybookings">
            <div onClick={changeURL} style={{ marginLeft: "10px" }}>
              My Bookings
            </div>
          </Link>
          <Link to="/profile">
            <div onClick={changeURL} style={{ marginLeft: "10px" }}>
              Edit Profile
            </div>
          </Link>
          <div style={{ marginLeft: "10px" }}>
            {localStorage.getItem("name")}
          </div>
          <Button
            onClick={logout}
            style={{ marginLeft: "10px" }}
            variant="contained"
          >
            Logout
          </Button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
