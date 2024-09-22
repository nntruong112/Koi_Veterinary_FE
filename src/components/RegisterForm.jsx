import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Spin,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log(values);
  };

  return (
    <div className="w-1/2 flex flex-col my-40 items-start bg-white bg-center bg-cover bg-[url('./src/assets/LoginLogo.png')]  min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm">
      <Card
        style={{
          width: "full",
          padding: "0px",
          background: "transparent",
        }}
      >
        <Flex align="center">
          {/* ---------- Left Side -------------- */}
          <Flex
            vertical
            flex={1}
            className="bg-gradient-to-b from-gray-300/40 to-gray-600/40  gap-y-20  px-[40px] py-[120px]"
          >
            <Typography.Title
              level={1}
              strong
              className="flex justify-center items-center"
            >
              Hello Friends
            </Typography.Title>

            <Typography.Text
              level={3}
              strong
              className="flex justify-center items-center"
            >
              If you have an account, login here and have fun.
            </Typography.Text>

            <Form.Item>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                size="large"
                style={{
                  width: "100%",
                  borderRadius: "50px",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Flex>

          {/* ---------- Right Side ------------- */}
          <Flex vertical flex={1} className="bg-white px-[50px] py-[67px]">
            <Typography.Title
              level={3}
              strong
              className="flex justify-center items-center"
            >
              Sign In
            </Typography.Title>
            <Typography.Text
              type="secondary"
              strong
              className="flex justify-center items-center"
            ></Typography.Text>
            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
              {/* -------- FULL NAME -------- */}
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your full name" },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>
              {/* --------- EMAIL -------- */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not valid Email" },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>

              {/* -------- PASSWORD --------- */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                />
              </Form.Item>

              {/* -------- CONFIRM PASSWORD --------- */}
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter your password"
                />
              </Form.Item>

              {/* -------- BUTTON ------ */}
              {/* {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-[1.5rem]"
                />
              )} */}
              <Form.Item>
                <Button
                  // type={`${loading ? "" : "primary"}`}
                  htmlType="submit"
                  size="large"
                  style={{
                    width: "100%",
                    background: "green",
                    color: "white",
                    borderRadius: "50px",
                  }}
                >
                  {/* {loading ? <Spin/> : 'Create Account'} */}
                  Create an account
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default RegisterForm;
