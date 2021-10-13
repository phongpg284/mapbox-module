import { Space } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Lái máy chính",
    dataIndex: "mainDriver",
    key: "mainDriver",
  },
  {
    title: "Lái máy phụ",
    dataIndex: "sideDriver",
    key: "sideDriver",
  },
  {
    title: "Quản lí",
    dataIndex: "manager",
    key: "manager",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Khoảng hoạt động",
    dataIndex: "range",
    key: "range",
  },
  {
    title: "Thao tác",
    key: "action",
    render: (text: any, record: any) => (
      <Space size="middle">
        <button>Info</button>
        <button>Delete</button>
      </Space>
    ),
  },
];

export default columns;
