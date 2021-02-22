import React, { useEffect, useState } from "react";

import { getInventoryIssues } from "../../util/APIUtils";
import { Table, Button } from "antd";
import { inventoryTableColumns } from "./ColumnNames";
import InventoryIssueDetails from "./components/InventoryIssueDetails";

import "./InventoryIssueView.css";
import InventoryFilter from "./components/InventoryFilter";
import LoadingIndicator from "../../components/loadingIndicator";
import LogoutButton from "../userView/components/LogoutButton/LogoutButton";
import { useDispatch } from "react-redux";
import { addInventoryIssueThunk } from "../../features/forms/InventoryIssueSlice";
import moment from "moment";

const ViewMode = {
  Display: 0,
  Edit: 1,
  New: 2,
};

function InventoryIssueView() {
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState(ViewMode.Display);

  const [data, setData] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [contentsData, setContentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getInventoryIssues();
      if (result) setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  function handleSave() {
    const record = {
      ...issueData,
      documentdate: moment(issueData.documentDate).format("yyyy-MM-dd"),
      postingdate: moment(issueData.postingdate).format("yyyy-MM-dd"),
      posted: false, //boolean - keep this false
      draft: true, //boolean - keep this true
      rows: contentsData,
    };
    console.log(record);
    dispatch(addInventoryIssueThunk(record));
  }
  function handlePost() {}

  return (
    <>
      <div className="inventory-header">
        <div>
          <h2>Inventory Issue</h2>
        </div>
        <div></div>
        <div>
          <LogoutButton />
        </div>
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="inventory-btn-panel">
            {viewMode === ViewMode.Display ? (
              <>
                <Button
                  onClick={() => {
                    setViewMode(ViewMode.New);
                    setSelectedRecord(undefined);
                  }}
                >
                  Add Inventory Issue (||)
                </Button>
                <Button
                  disabled
                  onClick={() => {
                    setViewMode(ViewMode.Edit);
                  }}
                >
                  Edit Selected Inventory Issue
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setViewMode(ViewMode.Display)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save as Draft</Button>
                <Button onClick={handlePost}>Post</Button>
              </>
            )}
          </div>
          <div className="issue-container">
            <InventoryFilter className="filter-container" />

            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setSelectedRecord(record);
                    setViewMode(ViewMode.Display);
                  }, // click row
                };
              }}
              dataSource={data}
              columns={inventoryTableColumns}
              rowKey="id"
              size="small"
              pagination={{ hideOnSinglePage: true, pageSize: 50 }}
              scroll={{ x: "calc(20vw)", y: "calc(60vh)" }}
              className="table-container"
              rowClassName={(record) => {
                return selectedRecord && record.id === selectedRecord.id
                  ? "selected-row"
                  : "";
              }}
            />
            <div className="details-container">
              <InventoryIssueDetails
                issue={selectedRecord}
                isDisabled={viewMode === ViewMode.Display}
                handleIssueData={(data) => setIssueData(data)}
                handleContentsData={(data) => setContentsData(data)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default InventoryIssueView;
