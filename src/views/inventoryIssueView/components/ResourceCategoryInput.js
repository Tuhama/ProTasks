import React, { useEffect, useState } from "react";
import { Modal, Input, Table } from "antd";
import { getResourceCategories } from "../../../util/APIUtils";
import { resourceCategoriesTableColumns } from "../ColumnNames";

export default function ResourceCategoryInput({ value, onChange, isDisabled }) {
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [resourceCategories, setResourceCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  useEffect(() => {
    const fetchResourceCategories = async () => {
      const result = await getResourceCategories();
      if (result) setResourceCategories(result);
    };
    fetchResourceCategories();
  }, []);

  const handleDblClick = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Input
        disabled={isDisabled}
        onDoubleClick={handleDblClick}
        onChange={triggerChange}
        value={value}
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
                setSelectedCategory(record);
                triggerChange(record.name);
              }, // click row
            };
          }}
          dataSource={resourceCategories}
          columns={resourceCategoriesTableColumns}
          rowKey="id"
          size="small"
          rowClassName={(record) => {
            return selectedCategory && record.id === selectedCategory.id
              ? "selected-row"
              : "";
          }}
        />
      </Modal>
    </>
  );
}
