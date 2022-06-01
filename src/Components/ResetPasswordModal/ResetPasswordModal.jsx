import React, { useState } from "react";
import "./ResetPasswordModal.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "../../utlis/utils";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { SuccessPopUp } from "../../utlis/SuccessPopUp";

export const ResetPasswordModal = ({ IsModalOpen, setIsModalOpen, params }) => {
  const navigate = useNavigate();
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const style = {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/login");
  };
  const resetPassword = (value) => {
    let data = { password: value.password, userId: params._id };
    document.getElementById("loader").style.display = "block";
      requestAPI("POST", "/resetpasswordset", data, null)
      .then((res) => {
      document.getElementById("loader").style.display = "none";
      setSuccessMessage(res.data.message);
      setOpenSuccessPoUp(true);
      setTimeout(() => {
        navigate('/login');
      },1000);
      setIsModalOpen(false);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
      });
  };
  return (
      <>
    <Modal open={IsModalOpen}>
      <Box sx={{ ...style, width: 480 }}>
        <ImCross className="cross" size="1.5em" onClick={handleClose} />
        <h2 style={{ margin: "auto" }}>Reset Password:</h2>
        <Form
          className="frm-s"
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
          onFinish={resetPassword}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            style={{ margin: "20px 0px" }}
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{ margin: "20px 0px" }}
            label="Confirm Password"
            name="npassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The two passwords did not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ margin: "40px 0px" }}
          >
            <Button
              style={{ display: "block" }}
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
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
