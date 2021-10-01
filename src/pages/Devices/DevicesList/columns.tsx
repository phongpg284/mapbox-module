import { Space, Tag } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Tên máy",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mã thiết bị vòng tua",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Lái máy chính",
    dataIndex: "driver",
    key: "driver",
  },
  {
    title: "Dự án phân công",
    dataIndex: "project",
    key: "project",
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
