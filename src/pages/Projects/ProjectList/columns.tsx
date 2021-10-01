import { Space, Tag } from "antd";

const columns = [
  {
    title: "Mã dự án",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Tên dự án",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Giá trị hợp đồng (Tỷ VNĐ)",
    dataIndex: "valuation",
    key: "valuation",
  },
  {
    title: "Giá trị thực hiện (Tỷ VNĐ)",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Hoàn thành (%)",
    dataIndex: "percentage",
    key: "percentage",
  },

  {
    title: "Thời gian hợp đồng (Ngày)",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Thời gian hiện thực (Ngày)",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thời gian còn lại (ngày)",
    dataIndex: "name",
    key: "name",
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
