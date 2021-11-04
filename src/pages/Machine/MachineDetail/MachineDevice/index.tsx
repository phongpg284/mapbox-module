import './style.css'
import columns from './columns'
import { Button, Space, Table } from 'antd'
import faker from 'faker'
import { Link } from 'react-router-dom'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import MachineDeviceAddModal from './MachineDeviceAddModal'
const MachineDevice = ({ id }: any) => {
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/devices/${record.id}`}>{text}</Link>
            ),
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button>Xóa</button>
                </Space>
            ),
        },
    ]

    const [response, isFetching, setRequest] = useFetch({
        endPoint: 'https://dinhvichinhxac.online/api/machine-device/',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        requestBody: {
            action: 'read',
            machine_id: id,
        },
    })

    const [deviceList, setDeviceList] = useState<any>([])
    useEffect(() => {
        if (!isFetching && response?.data && !response?.hasError) {
            const convertDeviceList = []
            for (const { device } of response.data) {                
                const newDevice = {
                    ...device,
                    status: (Math.abs(new Date(device.update_time).getTime() - Date.now()) < 120)
                }
                convertDeviceList.push(newDevice)
            }
            setDeviceList(convertDeviceList)
        }
    }, [response])

    const [isShowMachineDeviceAddModal, setIsShowMachineDeviceAddModal] =
        useState(false)

    const handleShowMachineDeviceAddModal = () => {
        setIsShowMachineDeviceAddModal(true)
    }

    const handleHideMachineDeviceAddModal = () => {
        setIsShowMachineDeviceAddModal(false)
    }

    return (
        <div className="machine-devices-container">
            <div className="machine-devices-control">
                <div className="machine-list-control-report">
                    <Button>Xuất báo cáo</Button>
                </div>
                <div className="machine-list-control-add">
                    <Button onClick={handleShowMachineDeviceAddModal}>
                        Thêm thiết bị
                    </Button>
                </div>
            </div>
            <div className="machine-list-table">
                <Table
                    columns={tableColumns}
                    dataSource={deviceList}
                    bordered
                />
            </div>
            <MachineDeviceAddModal
                id={id}
                centered
                width={800}
                visible={isShowMachineDeviceAddModal}
                onClose={handleHideMachineDeviceAddModal}
            />
        </div>
    )
}

export default MachineDevice
