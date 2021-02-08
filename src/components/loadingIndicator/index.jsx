import React from "react";
import { Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons/lib";

export default function LoadingIndicator(props) {
  return (
    <div className="center-content">
      {" "}
      <Spin
        tip={props.tip}
        indicator={<SyncOutlined style={{ fontSize: 30 }} spin />}
      />
    </div>
  );
}
