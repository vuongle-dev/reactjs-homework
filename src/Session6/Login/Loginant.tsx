import React, { useState } from "react";
import styles from "./Login.module.css";
import axiosClient from "../config/axiosClient";
import { Button, Form, Input, Modal, message } from "antd";

type Props = { setIsLoggedIn: (data: any) => void; messageApi: any };

interface loginFormInput {
  username: string;
  password: string;
}

export default function Loginant({ setIsLoggedIn, messageApi }: Props) {
  const onSubmit = async (data: loginFormInput) => {
    console.log(data);
    try {
      messageApi.open({ key: "login", type: "loading", content: "Loading" });
      const response = await axiosClient.post("/auth/login", data);
      if (response.data.loggedInUser) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("email", response.data.loggedInUser.email);
        localStorage.setItem("role", response.data.loggedInUser.roles[0].name);
        messageApi.open({
          key: "login",
          type: "success",
          content: "Login success",
          duration: 2,
        });
        setIsLoggedIn(true);
      } else
        messageApi.open({
          key: "login",
          type: "error",
          content: response.data.message,
          duration: 2,
        });
    } catch (error: any) {
      messageApi.open({
        key: "login",
        type: "error",
        content: error.response.data.message,
        duration: 2,
      });
    }
  };
  const [loginPopup, setLoginPopup] = useState(false);
  const [loginform] = Form.useForm();

  return (
    <>
      <Button type="primary" onClick={() => setLoginPopup(true)}>
        Login
      </Button>
      <Modal
        open={loginPopup}
        onCancel={() => setLoginPopup(false)}
        onOk={() => loginform.submit()}
        okText="Login"
        title="Login"
      >
        <Form onFinish={onSubmit} form={loginform}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username" },
              { type: "email" },
              { max: 30, message: "Username is too long" },
            ]}
          >
            <Input name="username" type="email" max={30}></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password" },
              { type: "string" },
              { max: 30, message: "Password is too long" },
            ]}
          >
            <Input.Password
              name="password"
              type="password"
              max={30}
            ></Input.Password>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
