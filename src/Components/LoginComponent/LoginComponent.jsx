import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";
import { requestAPI } from "../../utlis/utils";
import "./LoginComponent.css";

export const LoginComponent = () => {
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onLogin = (values) => {
    document.getElementById("loader").style.display = "block";
    requestAPI("POST", "/login", values, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("usertype", res.data.user.userType);
        localStorage.setItem(
          "name",
          res.data.user.firstName + " " + res.data.user.lastName
        );
        localStorage.setItem("userId", res.data.user._id);
        window.location.href = '/';
      })
      .catch((err) => {
        document.getElementById("loader").style.display = "none";
        setErrorMessage(err.response.data.message);
        setOpenErrorPoUp(true);
      });
  };

  return (
    <>
      <div className="out"></div>
      <div className="form-cmp">
        <h1 className="login">Login</h1>
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
          onFinish={onLogin}
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="User Type"
            name="userType"
            rules={[
              {
                required: true,
                message: "Please select User Type!",
              },
            ]}
          >
            <Select defaultValue="Option">
              <Select.Option value="Normal">Normal</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <div style={{margin: "5px 0px"}}>
            <Link to="/reset">Forgot Password?</Link>
          </div>
          <div style={{textAlign: "center"}} > 
          <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>

        </Form>
        <div className="login">
          <Link to="/signup">
            <p>Click here to SignUp</p>
          </Link>
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
