import './style.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Space, Table } from 'antd'

import MachineDeviceAddModal from './MachineDeviceAddModal'

import columns from './columns'

const MachineDevice = ({ id, data, refetch }: any) => {
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

    const [deviceList, setDeviceList] = useState<any>([])
    useEffect(() => {
        if (data) {
            const convertDeviceList = []
            for (const { device } of data) {
                const newDevice = {
                    ...device,
                    status:
                        Math.abs(
                            new Date(device.update_time).getTime() - Date.now()
                        ) < 120,
                }
                convertDeviceList.push(newDevice)
            }
            setDeviceList(convertDeviceList)
        }
    }, [data])

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
                update={refetch}
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
