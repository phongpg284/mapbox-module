import './style.css'
import columns from './columns'
import { Button, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import ProjectDeviceAddModal from './ProjectDeviceAddModal'
const ProjectDevice = ({ id }: any) => {
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
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
                    <button>SMS</button>
                    <button>Thoát dự án</button>
                </Space>
            ),
        },
    ]

    const [response, isFetching, setRequest] = useFetch({
        endPoint: 'https://dinhvichinhxac.online/api/project-machine/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            project_id: id,
        },
    })

    const [deviceList, setDeviceList] = useState<any>([])
    useEffect(() => {
        if (!isFetching && response?.data && !response?.hasError) {
            const convertDeviceList = []
            for (const { machine } of response.data) {
                const newDevice = {
                    id: machine.id,
                    name: machine.name,
                    create_time: machine.create_time,
                    update_time: machine.update_time,
                }
                convertDeviceList.push(newDevice)
            }
            console.log(convertDeviceList)

            setDeviceList(convertDeviceList)
        }
    }, [response])

    const [isShowProjectDeviceAddModal, setIsShowProjectDeviceAddModal] =
        useState(false)

    const handleShowProjectDeviceAddModal = () => {
        setIsShowProjectDeviceAddModal(true)
    }

    const handleHideProjectDeviceAddModal = () => {
        setIsShowProjectDeviceAddModal(false)
    }

    return (
        <div className="project-devices-container">
            <div className="project-devices-control">
                <div className="project-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="project-list-control-add">
                    <Button onClick={handleShowProjectDeviceAddModal}>
                        Thêm thiết bị vào dự án
                    </Button>
                </div>
            </div>
            <div className="project-list-table">
                <Table columns={tableColumns} dataSource={deviceList} bordered />
            </div>
            <ProjectDeviceAddModal
                id={id}
                centered
                width={800}
                visible={isShowProjectDeviceAddModal}
                onClose={handleHideProjectDeviceAddModal}
            />
        </div>
    )
}

export default ProjectDevice
