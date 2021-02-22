import React from "react";
import { Tabs } from "antd";
import IssueContents from "./IssueContents";
import IssueInfoForm from "./IssueInfoForm";

const { TabPane } = Tabs;

export default function InventoryIssueDetails({
  issue,
  isDisabled,
  handleIssueData,
  handleContentsData,
}) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Inventory Issue Details" key="1">
          <div style={{ height: "50%" }}>
            <IssueInfoForm
              issue={issue}
              isDisabled={isDisabled}
              handleIssueData={handleIssueData}
            />
          </div>

          <div style={{ height: "50%" }}>
            <IssueContents
              issue={issue}
              isDisabled={isDisabled}
              handleContentsData={handleContentsData}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
