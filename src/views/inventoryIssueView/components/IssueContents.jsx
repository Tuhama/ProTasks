import React, { useContext, useState, useEffect, useRef } from "react";
import { Tabs, Table, Button, Input, Form, Modal } from "antd";
import {
  inventoryDetailsTableColumns,
  resourcesTableColumns,
} from "../ColumnNames";
import { getCategoryResources } from "../../../util/APIUtils";

const EditableContext = React.createContext(null);
const { TabPane } = Tabs;

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
  } else return [];
}

export default function IssueContents({
  issue,
  isDisabled,
  handleSave,
  handleContentsData,
}) {
  const [issueDetails, setIssueDetails] = useState([]);
  const [resources, setResources] = useState([]);

  const [selectedContent, setSelectedContent] = useState({});
  const [selectedResource, setSelectedResource] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      const result = await getCategoryResources(issue.resourcecategoryid);
      if (result) setResources(result);
    };
    setIssueDetails(getIssueDetails(issue));
    if (issue) {
      fetchResources();
    }
  }, [issue]);

  useEffect(() => {
    handleContentsData(issueDetails);
  }, [issueDetails]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = inventoryDetailsTableColumns.map((col) => {
    if (col.dataIndex === "resourcename") {
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: !isDisabled,
          dataIndex: col.dataIndex,
          title: col.title,
          // handleSave: handleSave,
          onDoubleClick: () => {
            setSelectedContent(record);
            setIsModalVisible(true);
          },
        }),
      };
    } else
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: !isDisabled,
          dataIndex: col.dataIndex,
          title: col.title,
          //  handleSave: handleSave,
        }),
      };
  });

  const handleAddRow = () => {
    const newRow = {
      key: issueDetails ? issueDetails.count + 1 : 1,
      resourceid: "", //get it from the resource selection dialog
      resourcecode: "", //get it from the resource selection dialog
      resourcename: "test", //get it from the resource selection dialog
      unitid: 1,
      currencyid: 1,
      unitcode: "liter(s)",
      quantity: 0, //entered manually by user (enter any r
      store: "Store 01",
      rate: 1,
      storeid: 1,
      remarks: "test remarks",
    };
    setIssueDetails([...issueDetails, newRow]);
  };
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Issue Contents" key="1">
          <div className="buttons-container">
            <Button
              disabled={isDisabled}
              className="control-button"
              onClick={handleAddRow}
            >
              Add Row
            </Button>
            <Button disabled={isDisabled} className="control-button">
              Move Row Up
            </Button>
            <Button disabled={isDisabled} className="control-button">
              Move Row Down
            </Button>
            <Button disabled={isDisabled} className="control-button">
              Delete Selected Row
            </Button>
          </div>
          <br />
          <Table
            components={components}
            dataSource={issueDetails}
            columns={columns}
            rowKey="rowid"
            size="small"
            pagination={{ hideOnSinglePage: true, pageSize: 30 }}
            scroll={{ x: true, y: "20vh" }}
          />

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
          >
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setSelectedResource(record);
                    if (selectedContent.resourceid !== selectedResource.id)
                      setIssueDetails(
                        issueDetails.map((d) => {
                          if (selectedContent === d) {
                            return {
                              ...d,
                              resourcecode: record.code,
                              resourcename: record.name,
                              resourceid: record.id,
                            };
                          } else return d;
                        })
                      );
                  }, // click row
                };
              }}
              dataSource={resources}
              columns={resourcesTableColumns}
              rowKey="id"
              size="small"
              rowClassName={(record) => {
                return selectedResource && record.id === selectedResource.id
                  ? "selected-row"
                  : "";
              }}
            />
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  );
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  // handleSave,
  onDoubleClick,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      // handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          onDoubleClick={onDoubleClick}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
