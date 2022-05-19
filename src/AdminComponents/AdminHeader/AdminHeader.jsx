import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../utlis/utils';
import './AdminHeader.css'

export const AdminHeader = () => {
  return (
    <header className="head">
      <Link to='/admin'><h2 style={{ margin: "0px", marginLeft: "10px" }}>BookBus</h2></Link>
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
          <Link to="/admin/buses">
            <div style={{ marginLeft: "10px" }}>
              Buses
            </div>
          </Link>
          <Link to="/admin/tickets">
            <div style={{ marginLeft: "10px" }}>
              Tickets
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

  )
}
