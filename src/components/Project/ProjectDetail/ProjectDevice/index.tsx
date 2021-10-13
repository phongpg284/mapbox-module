import './style.css'
import columns from './columns'
import { Button, Table } from 'antd'
import faker from 'faker'
const ProjectDevice = () => {
    let data = []
    for (let i = 0; i < 50; i++) {
        data.push({
            index: i,
            name: faker.name.findName(),
            mainDriver: faker.name.findName(),
            sideDriver: faker.name.findName(),
            manager: faker.name.findName(),
            status: faker.datatype.boolean() ? 'Có' : 'Không',
            range: faker.datatype.float(),
        })
    }

    return (
        <div className="project-devices-container">
            <div className="project-devices-control">
                <div className="project-devices-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="project-devices-control-add">
                    <Button>Thêm người dùng vào dự án</Button>
                </div>
            </div>
            <div className="project-devices-table">
                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    )
}

export default ProjectDevice
