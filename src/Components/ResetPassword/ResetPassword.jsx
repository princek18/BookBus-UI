import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { SuccessPopUp } from "../../utlis/SuccessPopUp";
import { requestAPI } from "../../utlis/utils";
import { ResetPasswordModal } from "../ResetPasswordModal/ResetPasswordModal";
import "./ResetPassword.css";

export const ResetPassword = () => {
    const navigate = useNavigate();
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetModal, setResetModal] = useState(false);
  const [params, setParams] = useState("");

  const onReset = (value) => {
      console.log(value);
      document.getElementById("loader").style.display = "block";
      requestAPI("POST", "/resetpassword", value, null)
      .then((res) => {
      document.getElementById("loader").style.display = "none";
      setSuccessMessage(res.data.message);
      setOpenSuccessPoUp(true);
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
      });
  }

  useEffect(() => {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    if (params?.get("auth")) {
      try{
        if (JSON.parse(atob(params.get("auth"))).expiry > (new Date()).getTime()) {
          setParams(JSON.parse(atob(params.get("auth"))));
          setResetModal(true);
        }
        else{
          alert("Link Expired, Please generate a new Link.");
          navigate('/login');
        }
        }
        catch(err){
          setErrorMessage(err.response.data.message);
          setOpenErrorPoUp(true);
        }
      }

  },[]);

  return (
    <>
      <div className="out"></div>
      <div className="form-cmp">
        <h1 className="login">Reset Password</h1>
        <Form
          className="frm-res"
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
          onFinish={onReset}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <div className="div-margin"></div>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
        <div className="login">
          <Link to="/login">
            <p>Click here to Login</p>
          </Link>
        </div>
      </div>
      <ResetPasswordModal IsModalOpen={resetModal} setIsModalOpen={setResetModal} params={params} />
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
