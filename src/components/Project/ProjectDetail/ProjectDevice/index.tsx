import './style.css'
import columns from './columns'
import { Button, Modal, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import DeviceProjectModal from '../../../Device/Modal/DeviceProjectModal'
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

    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên thiết bị',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/devices/${record.key}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button onClick={handleClick}>Chi tiết quản lí</button>
                    <button>Delete</button>
                </Space>
            ),
        },
    ]

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleClick = () => {
        showModal()
    }

    return (
        <div className="project-devices-container">
            <div className="project-devices-control">
                <div className="project-devices-control-report">
                    <Button>Phân công thiết bị</Button>
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="project-devices-control-add">
                    <Button>Thêm thiết bị vào dự án</Button>
                </div>
            </div>
            <div className="project-devices-table">
                <Table columns={tableColumns} dataSource={data} bordered />
            </div>
            <Modal
                centered
                width={1000}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                title="Chi tiết phân công thiết bị  "
            >
                <DeviceProjectModal />
            </Modal>
        </div>
    )
}

export default ProjectDevice
