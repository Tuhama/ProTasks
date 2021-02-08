import React from "react";
import { Tabs, Table, Button } from "antd";
import { inventoryDetailsTableColumns } from "../ColumnNames";

const { TabPane } = Tabs;

export default function IssueContents({ issue }) {
  function getIssueDetails(issue) {
    if (issue) {
      let details = [];

      const count = JSON.parse(issue.rowid).length;
      for (let i = 0; i < count; i++) {
        details.push({
          rowid: JSON.parse(issue.rowid)[i],
          resourcestoreid: JSON.parse(issue.resourcestoreid)[i],
          resourceid: JSON.parse(issue.resourceid)[i],
          resourcecode: JSON.parse(issue.resourcecode)[i],
          resourcename: JSON.parse(issue.resourcename)[i],
          quantity: JSON.parse(issue.quantity)[i],
          unitid: JSON.parse(issue.unitid)[i],
          rate: JSON.parse(issue.rate)[i],
          unitcode: JSON.parse(issue.unitcode)[i],
          store: JSON.parse(issue.store)[i],
        });
      }
      return details;
    }
  }

  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Issue Contents" key="1">
          {issue ? (
            <>
              <div className="buttons-container">
                <Button disabled className="control-button">
                  Add Row
                </Button>
                <Button disabled className="control-button">
                  Move Row Up
                </Button>
                <Button disabled className="control-button">
                  Move Row Down
                </Button>
                <Button disabled className="control-button">
                  Delete Selected Row
                </Button>
              </div>
              <br />
              <Table
                dataSource={getIssueDetails(issue)}
                columns={inventoryDetailsTableColumns}
                rowKey="rowid"
                size="small"
                pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                scroll={{ x: 1200, y: "20vh" }}
              />
            </>
          ) : null}
        </TabPane>
      </Tabs>
    </div>
  );
}
