import style from './index.module.scss'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button, Input, Space, Table } from 'antd'

import MachineDeviceAddModal from './MachineDeviceAddModal'

import columns from './columns'
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai'
import { SearchOutlined } from '@ant-design/icons'
import { BsArrowDownCircle, BsPlusCircle } from 'react-icons/bs'
import useFilter from '../../../../hooks/useFilter'

const MachineDevice = ({ id, data, refetch }: any) => {
    const history = useHistory()
    const tableColumns = [
        ...columns.slice(0, 1),
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={`/devices/${record.id}`}>{text}</Link>,
        },
        ...columns.slice(1),
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={style.control_button} onClick={() => history.push(`/devices/${record.id}`)}>
                        <AiOutlineInfoCircle />
                    </button>
                    <button className={style.control_button}>
                        <AiOutlineDelete />
                    </button>
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
                    status: Math.abs(new Date(device.update_time).getTime() - Date.now()) < 120000,
                }
                convertDeviceList.push(newDevice)
            }
            setDeviceList(convertDeviceList)
        }
    }, [data])

    const [isShowMachineDeviceAddModal, setIsShowMachineDeviceAddModal] = useState(false)

    const handleShowMachineDeviceAddModal = () => {
        setIsShowMachineDeviceAddModal(true)
    }

    const handleHideMachineDeviceAddModal = () => {
        setIsShowMachineDeviceAddModal(false)
    }

    const [search, onChangeSearch, filterData] = useFilter(deviceList, 'name')

    return (
        <div className={style.machine_devices_list_wrapper}>
            <div className={style.machine_devices_list_control}>
                <div className={style.machine_devices_list_control_search}>
                    <Input prefix={<SearchOutlined className="site-form-item-icon" />} value={search} onChange={onChangeSearch} placeholder="Tên thiết bị" />
                </div>
                <div className={style.machine_devices_list_control_actions}>
                    <Button onClick={handleShowMachineDeviceAddModal}>
                        <BsPlusCircle />
                        Thêm
                    </Button>
                    <Button>
                        <BsArrowDownCircle />
                        Xuất file
                    </Button>
                </div>
            </div>

            <div className="machine-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered />
            </div>
            <MachineDeviceAddModal update={refetch} id={id} centered width={800} visible={isShowMachineDeviceAddModal} onClose={handleHideMachineDeviceAddModal} />
        </div>
    )
}

export default MachineDevice
