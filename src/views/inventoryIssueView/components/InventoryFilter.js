import React, { useState } from "react";
import { AutoComplete, Input } from "antd";

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

export default function InventoryFilter() {
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  return (
    <div className="filter-container">
      <h3>Filters:</h3>
      <AutoComplete
        options={options}
        style={{
          width: 300,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search />
      </AutoComplete>
    </div>
  );
}
