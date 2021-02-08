import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isSuccess } = useSelector((state) => state.auth);

  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  function onFinish(values) {
    dispatch(
      loginThunk({ password: values.password, username: values.username })
    );
  }

  return (
    <div className="form-container" style={{ maxWidth: 500 }}>
      <Form
        name="normal_login"
        className="n-form"
        initialValues={{
          username: "lab",
          password: "65",
        }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "this field is required" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User Name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "this field is required" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="n-form-button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
