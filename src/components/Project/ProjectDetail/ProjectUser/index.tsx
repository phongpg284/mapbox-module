import './style.css'
import columns from './columns'
import { Button, Table } from 'antd'
import faker from 'faker'
const ProjectUser = () => {
    let data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            index: i,
            name: faker.name.findName(),
            username: faker.internet.userName(),
            phone: faker.phone.phoneNumber(),
            role: faker.datatype.string(),
        },)
    }
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
                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default ProjectUser
