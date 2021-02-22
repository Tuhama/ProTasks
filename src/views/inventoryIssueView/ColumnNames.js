export const inventoryTableColumns = [
  {
    title: "",
    className: "table-first-column",
    width: "20px",
  },
  {
    title: "Document Date",
    dataIndex: "documentdate",
    render: (text, record, index) => text.slice(2).replace(/-/g, "/"),
    key: "documentdate",
    width: "100px",
  },
  {
    title: "User Reference",
    dataIndex: "userreference",
    key: "userreference",
    width: "150px",
  },
  {
    title: "posted",
    dataIndex: "posted",
    render: (text, record, index) => text.toString(),
    key: "posted",
    width: "50px",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "50px",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
    width: "100px",
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
    width: "150px",
  },
];

export const resourceCategoriesTableColumns = [
  {
    title: "",
    className: "table-first-column",
    width: "20px",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "200px",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "150px",
  },
];
export const resourcesTableColumns = [
  {
    title: "",
    className: "table-first-column",
    width: "20px",
  },
  {
    title: "Serial Number",
    dataIndex: "serialnumber",
    key: "serialnumber",
    width: "150px",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "200px",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "100px",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: "75px",
  },
];
