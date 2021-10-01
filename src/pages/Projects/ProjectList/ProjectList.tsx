import "./index.css";
import columns from "./columns";
import { Input, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
const ProjectList = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="projects-list-wrapper">
      <div className="projects-list-control">
        <div className="projects-list-control-search">
          <Input
            prefix={<SearchOutlined className="site-form-item-icon" />}
          />
        </div>
        <div className="projects-list-control-actions">
          <PlusOutlined />
        </div>
      </div>
      <div className="projects-list-table">
        <Table columns={columns} dataSource={data} bordered/>;
      </div>
    </div>
  );
};

export default ProjectList;
