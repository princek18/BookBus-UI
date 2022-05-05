import React, { useState } from "react";
import "./WalletModal.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { logout, requestAPI } from "../../../utlis/utils";
import { ImCross } from "react-icons/im";
import { ErrorPopUp } from "../../../utlis/ErrorPopUp";
import { SuccessPopUp } from "../../../utlis/SuccessPopUp";

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

const ChildModal = ({
  setWallet,
  setOpen,
  setUserForm,
  userForm,
  setPFlag,
  pFlag,
  open,
  handleInput,
}) => {
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
    setUserForm({
      ...userForm,
      password: "",
    });
  };
  const handleSubmit = () => {
    if (userForm.password === null || userForm.password === "") {
      setPFlag(true);
    } else {
      setOpen(false);
      document.getElementById("loader").style.display = "block";
      requestAPI("PUT", "/addMoney", userForm, null)
        .then((res) => {
          document.getElementById("loader").style.display = "none";
          setSuccessMessage(res.data.message);
          setOpenSuccessPoUp(true);
          setWallet(res.data.money);
          setUserForm({
            money: "",
            password: "",
          });
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          setErrorMessage(err.response.data.message);
          setOpenErrorPoUp(true);
          setUserForm({
            ...userForm,
            password: "",
          });
          if (err.response.data === "Authentication Failed.") {
            logout();
          }
        });
    }
  };

  return (
    <>
      <Modal hideBackdrop open={open}>
        <Box sx={{ ...style, width: 350 }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h2 style={{ margin: "auto" }}>Verify</h2>
          <div style={{ margin: "20px 0px" }}>
            <h3>Enter your password to verify transaction:</h3>
            <TextField
              id="outlined-number"
              label="Password"
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleInput}
              InputLabelProps={{
                shrink: true,
              }}
              error={pFlag}
            />
          </div>
          <Button color="warning" variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
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

export const WalletModal = ({
  IsModalOpen,
  urlHref,
  setUrlHref,
  wallet,
  setWallet,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [pFlag, setPFlag] = useState(false);
  const [userForm, setUserForm] = useState({
    money: "",
    password: "",
  });

  const handleInput = (e) => {
    if (userForm.money) {
      setFlag(false);
    } else if (userForm.password) {
      setPFlag(false);
    }
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleOpen = (e) => {
    e.preventDefault();
    if (
      userForm.money < 1 ||
      userForm.money === null ||
      userForm.money === ""
    ) {
      setFlag(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    navigate("/");
    setUrlHref(!urlHref);
  };

  return (
    <div>
      <Modal open={IsModalOpen}>
        <Box sx={{ ...style, width: 400 }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h2 style={{ margin: "auto" }}>Wallet</h2>
          <div style={{ margin: "20px 0px" }}>
            <h3>Current Balance:</h3>
            <h1>₹{wallet}</h1>
          </div>
          <form className="frm-w" onSubmit={handleOpen}>
            <TextField
              id="outlined-number"
              label="Add Balance"
              type="number"
              value={userForm.money}
              name="money"
              onChange={handleInput}
              InputLabelProps={{
                shrink: true,
              }}
              error={flag}
            />
            <Button
              style={{ width: "25%", marginTop: "20px" }}
              color="success"
              variant="contained"
              type="submit"
            >
              Add
            </Button>
          </form>
          <ChildModal
            handleInput={handleInput}
            open={open}
            pFlag={pFlag}
            setPFlag={setPFlag}
            setOpen={setOpen}
            userForm={userForm}
            setUserForm={setUserForm}
            setWallet={setWallet}
          />
        </Box>
      </Modal>
    </div>
  );
};
