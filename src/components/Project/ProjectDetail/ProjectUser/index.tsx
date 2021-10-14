import './style.css'
import columns from './columns'
import { Button, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
const ProjectUser = () => {
    let data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            index: i,
            name: faker.name.findName(),
            username: faker.internet.userName(),
            phone: faker.phone.phoneNumber(),
            role: faker.name.jobTitle(),
        },)
    }

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/users/${record.key}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>SMS</button>
                    <button>Thoát dự án</button>
                </Space>
            ),
        },
    ]

    return (
        <div className="project-users-container">
            <div className="project-users-control">
                <div className="project-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="project-list-control-add">
                    <Button>Thêm người dùng vào dự án</Button>
                </div>
            </div>
            <div className="project-list-table">
                <Table columns={tableColumns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default ProjectUser
