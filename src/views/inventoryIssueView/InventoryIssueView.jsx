import React, { useEffect, useState } from "react";

import { getInventoryIssue } from "../../util/APIUtils";
import { Row, Col, Table } from "antd";
import { inventoryTableColumns } from "./ColumnNames";
import InventoryIssueDetails from "./components/InventoryIssueDetails";

import "./InventoryIssueView.css";
import InventoryFilter from "./components/InventoryFilter";
import LoadingIndicator from "../../components/loadingIndicator";

function InventoryIssueView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getInventoryIssue();
      //getInventoryTableHeaders();
      if (result) setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Row gutter={[16, 8]} style={{ height: "90%", width: "90%" }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Col span={8}>
            <Row style={{ height: "20%" }}>
              <InventoryFilter />
            </Row>
            <Row>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setSelectedRecord(record);
                    }, // click row
                  };
                }}
                dataSource={data}
                columns={inventoryTableColumns}
                rowKey="id"
                size="small"
                pagination={{ hideOnSinglePage: true, pageSize: 50 }}
                scroll={{ y: "70vh", x: "45vw" }}
              />
            </Row>
          </Col>
          <Col span={16} style={{ height: "100%", width: "100%" }}>
            <InventoryIssueDetails issue={selectedRecord} />
          </Col>
        </>
      )}
    </Row>
  );
}

export default InventoryIssueView;
