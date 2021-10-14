import { Space, Tag } from "antd";

const columns = [
  {
    title: "Mã",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Tên đăng nhập",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Chức vụ",
    dataIndex: "role",
    key: "role",
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
