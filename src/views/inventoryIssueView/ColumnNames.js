export const inventoryTableColumns = [
  {
    title: "",
    className: "table-first-column",
    width: "20px",
  },
  {
    title: "Document Date",
    dataIndex: "documentdate",
    key: "documentdate",
  },
  {
    title: "User Reference",
    dataIndex: "userreference",
    key: "userreference",
  },
  {
    title: "posted",
    dataIndex: "posted",
    key: "posted",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
];

export const inventoryDetailsTableColumns = [
  {
    title: "",
    render: (text, record, index) => `${index + 1}`,
    className: "table-first-column",
    width: "30px",
  },
  {
    title: "Resource Code",
    dataIndex: "resourcecode",
    key: "resourcecode",
    width: "150px",
  },
  {
    title: "Resource Name",
    dataIndex: "resourcename",
    key: "resourcename",
    width: "250px",
  },
  {
    title: "Unit",
    dataIndex: "unitcode",
    key: "unitcode",
    width: "70px",
  },
  {
    title: "Available Qty.",
    dataIndex: "",
    key: "",
    width: "150px",
  },
  {
    title: "Qty To Issue",
    dataIndex: "quantity",
    key: "quantity",
    width: "150px",
  },
  {
    title: "Store",
    dataIndex: "store",
    key: "store",
    width: "70px",
  },
  {
    title: "Bins",
    dataIndex: "",
    key: "",
    width: "70px",
  },
  {
    title: "Unit Rate",
    dataIndex: "rate",
    key: "rate",
    width: "100px",
  },
  {
    title: "Currency Code",
    dataIndex: "",
    key: "",
    width: "150px",
  },
  {
    title: "Amount",
    dataIndex: "",
    key: "",
  },
];
