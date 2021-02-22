import React, { useEffect, useState } from "react";

import { Form, Input, Row, Col, DatePicker } from "antd";
import moment from "moment";
import ResourceCategoryInput from "./ResourceCategoryInput";

const { TextArea } = Input;

export default function IssueInfoForm({ issue, isDisabled, handleIssueData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (issue)
      form.setFieldsValue({
        ...issue,
        documentdate: moment(issue.documentdate),
        postingdate: moment(issue.postingdate),
      });
    else form.resetFields();
  }, [form, issue]);

  return (
    <Form
      form={form}
      size={"small"}
      id="issue-form"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      onValuesChange={(changedValues, allValues) => handleIssueData(allValues)}
    >
      <Row gutter={8}>
        <Col span={16}>
          <Form.Item label="Inventory Issue #" name="id">
            <Input disabled />
          </Form.Item>
          <br />
          <br />
          <Form.Item label="Store" name="storename">
            <Input disabled={isDisabled} />
          </Form.Item>
          <Form.Item label="Resource Category" name="resourcecategoryname">
            <ResourceCategoryInput issue={issue} isDisabled={isDisabled} />
          </Form.Item>
          <Form.Item name="unkowm" wrapperCol={{ span: 24 }}>
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Doc. Date" name="documentdate">
            <DatePicker format="YYYY/MM/DD" disabled={isDisabled} />
          </Form.Item>
          <Form.Item label="Posting Date" name="postingdate">
            <DatePicker format="YYYY/MM/DD" disabled={isDisabled} />
          </Form.Item>
          <Form.Item label="Issued To" name="issuedto">
            <Input disabled={isDisabled} />
          </Form.Item>
          <Form.Item label="User Ref #" name="userreference">
            <Input disabled={isDisabled} />
          </Form.Item>
          <br />
          <Form.Item name="remarks" label="Remarks">
            <TextArea rows={3} disabled={isDisabled} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
