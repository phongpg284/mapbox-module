import { Space, Tag } from "antd";

const columns = [
  {
    title: "Mã dự án",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Giá trị hợp đồng (Tỷ VNĐ)",
    dataIndex: "contractValuation",
    key: "contractValuation",
  },
  {
    title: "Giá trị thực hiện (Tỷ VNĐ)",
    dataIndex: "valuation",
    key: "valuation",
  },
  {
    title: "Hoàn thành (%)",
    dataIndex: "percentage",
    key: "percentage",
  },

  {
    title: "Thời gian hợp đồng (Ngày)",
    dataIndex: "contractTime",
    key: "contractTime",
  },
  {
    title: "Thời gian hiện thực (Ngày)",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Thời gian còn lại (ngày)",
    dataIndex: "remainTime",
    key: "remainTime",
  },
];

export default columns;
