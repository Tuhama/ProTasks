import React, { useState } from "react";

import { Form, Input, Row, Col, DatePicker } from "antd";
import moment from "moment";

const { TextArea } = Input;

export default function IssueInfoForm({ issue }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const worker = {
    ...issue,
    documentdate: moment(issue.documentdate),
    postingdate: moment(issue.postingdate),
  };

  return (
    <Form
      initialValues={worker}
      size={"small"}
      disabled
      id="issue-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
    >
      <Row gutter={8}>
        <Col span={16}>
          <Form.Item disabled={isDisabled} label="Inventory Issue #" name="id">
            <Input disabled={isDisabled} />
          </Form.Item>
          <br />
          <br />
          <Form.Item disabled={isDisabled} label="Store" name="storename">
            <Input disabled={isDisabled} />
          </Form.Item>
          <Form.Item
            disabled={isDisabled}
            label="Resource Category"
            name="resourcecategoryname"
          >
            <Input disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="unkowm" wrapperCol={{ span: 24 }}>
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            disabled={isDisabled}
            label="Doc. Date"
            name="documentdate"
          >
            <DatePicker disabled={isDisabled} />
          </Form.Item>
          <Form.Item
            disabled={isDisabled}
            label="Posting Date"
            name="postingdate"
          >
            <DatePicker disabled={isDisabled} />
          </Form.Item>
          <Form.Item disabled={isDisabled} label="Issued To" name="unkown">
            <Input />
          </Form.Item>
          <Form.Item
            disabled={isDisabled}
            label="User Ref #"
            name="userreference"
          >
            <Input disabled={isDisabled} />
          </Form.Item>
          <br />
          <Form.Item disabled={isDisabled} name="remarks" label="Remarks">
            <TextArea rows={3} disabled={isDisabled} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
