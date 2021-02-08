import React from "react";
import { Tabs, Descriptions } from "antd";
import IssueContents from "./IssueContents";
import IssueInfoForm from "./IssueInfoForm";

const { TabPane } = Tabs;

export default function InventoryIssueDetails({ issue }) {
  return (
    <div className="card-container">
      {issue ? (
        <Tabs type="card">
          <TabPane tab="Inventory Issue Details" key="1">
            <IssueInfoForm issue={issue} />
            <div style={{ height: "45%", width: "100%" }}>
              <IssueContents issue={issue} />
            </div>
          </TabPane>
        </Tabs>
      ) : null}
    </div>
  );
}
