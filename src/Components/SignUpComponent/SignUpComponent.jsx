import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./SignUpComponent.css";
import { requestAPI } from "../../utlis/utils";
import { Link, useNavigate } from "react-router-dom";
import { SuccessPopUp } from "../../utlis/SuccessPopUp";
import { ErrorPopUp } from "../../utlis/ErrorPopUp";

export const SignUpComponent = () => {
  const navigate = useNavigate();
  const [openSuccessPopUp, setOpenSuccessPoUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openErrorPopUp, setOpenErrorPoUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSignUp = (values) => {
    delete values.cpassword;
    document.getElementById("loader").style.display = "block";
    requestAPI("POST", "/signup", values, null)
      .then((res) => {
        document.getElementById("loader").style.display = "none";
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        setSuccessMessage(res.data.message);
        setOpenSuccessPoUp(true);
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
      <div className="form-cmp-s">
        <h1 className="login">Sign Up</h1>

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
          onFinish={onSignUp}
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
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
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
            label="Confirm Password"
            name="cpassword"
            hasFeedback
            dependencies={["password"]}
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
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="login">
          <Link to="/login">Click here to Login</Link>
        </div>
      </div>
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
