import React, { useEffect, useState } from "react";
import "./ProfilesModal.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { logout, requestAPI } from "../../../utlis/utils";
import { ImCross } from "react-icons/im";
import { Form, Input } from "antd";
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
      requestAPI("PUT", "/updateprofile", userForm, null)
        .then((res) => {
          document.getElementById("loader").style.display = "none";
          let response = res.data.user;
          setSuccessMessage(res.data.message);
          setOpenSuccessPoUp(true);
          setUserForm({
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            mobile: response.mobile,
            npassword: "",
            password: "",
          });
          localStorage.setItem(
            "name",
            response.firstName + " " + response.lastName
          );
        })
        .catch((err) => {
          document.getElementById("loader").style.display = "none";
          setErrorMessage(err.response.data.message);
          setOpenErrorPoUp(true);
          setUserForm({
            npassword: "",
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
            <h3>Enter your password to update your profile:</h3>
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

export const ProfilesModal = ({ IsModalOpen, urlHref, setUrlHref }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pFlag, setPFlag] = useState(false);
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    npassword: "",
    password: "",
  });

  useEffect(() => {
    document.getElementById("loader").style.display = "block";
    requestAPI("GET", "/getprofile", null, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        let response = res.data.user;
        setUserForm((prev) => ({
          ...prev,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          mobile: response.mobile,
        }));
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
        if (err.response.data === "Authentication Failed.") {
          logout();
        }
      });
  }, [IsModalOpen]);

  const handleInput = (e) => {
    if (userForm.password) {
      setPFlag(false);
    }
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleOpen = (values) => {
    setOpen(true);
    setUserForm({
      ...userForm,
      ...values,
    });
  };

  const handleClose = () => {
    navigate("/");
    setUrlHref(!urlHref);
  };

  return (
    <>
      <Modal open={IsModalOpen}>
        <Box sx={{ ...style, width: 480 }}>
          <ImCross className="cross" size="1.5em" onClick={handleClose} />
          <h2 style={{ margin: "auto" }}>Profile:</h2>
          <Form
            className="frm-s"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleOpen}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter your First Name!",
                },
              ]}
              initialValue={userForm.firstName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter your Last Name!",
                },
              ]}
              initialValue={userForm.lastName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
              initialValue={userForm.email}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter your Mobile no!",
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.length === 10) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("The mobile no. should be 10 digit long!")
                    );
                  },
                }),
              ]}
              initialValue={userForm.mobile}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="npassword"
              rules={[
                {
                  message: "Please enter your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={{ display: "block" }}
                type="primary"
                variant="contained"
                htmltype="submit"
              >
                Update
              </Button>
            </Form.Item>
          </Form>

          <ChildModal
            handleInput={handleInput}
            open={open}
            pFlag={pFlag}
            setPFlag={setPFlag}
            setOpen={setOpen}
            userForm={userForm}
            setUserForm={setUserForm}
          />
        </Box>
      </Modal>
      <ErrorPopUp
        message={errorMessage}
        open={openErrorPopUp}
        setOpen={setOpenErrorPoUp}
      />
    </>
  );
};
