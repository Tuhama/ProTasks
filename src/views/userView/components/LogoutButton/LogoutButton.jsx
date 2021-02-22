import React from "react";
import { Popconfirm, Button } from "antd";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../../../features/auth/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    dispatch(logoutThunk());
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Popconfirm
        title="Are you sure you want to logout?"
        visible={visible}
        onConfirm={handleOk}
        onCancel={handleCancel}
      >
        <Button type="primary" onClick={showPopconfirm}>
          Logout
        </Button>
      </Popconfirm>
    </>
  );
}
