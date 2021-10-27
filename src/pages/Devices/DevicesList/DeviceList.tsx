import columns from './columns'
import { Button, Input, Modal, Space, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import DeviceAddModal from '../DeviceAddModal'
const DeviceList = () => {
    const [devices, setDevices] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        setRequest({
            endPoint: 'https://dinhvichinhxac.online/api/device/',
            method: 'GET',
        })
    }, [])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) setDevices(response.data)
    }, [response])
    // useEffect(() => {
    //     fetch('https://dinhvichinhxac.online/api/device/', {
    //         method: 'GET',
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const convertData = data.response.map((device: any) => {
    //                 return {
    //                     ...device,
    //                     create_time: new Date(device.create_time).toLocaleString(),
    //                     update_time: new Date(device.update_time).toLocaleString(),
    //                 }
    //             })
    //             setDevices(convertData)
    //         })
    // }, [])

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
    const handleClickInfo = () => {
        showModal()
    }
    const tableColumns = [
        ...columns.slice(0, 2),
        {
            title: 'Tên dự án',
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
                    <button>Info</button>
                    <button>Delete</button>
                </Space>
            ),
        },
    ]

    return (
        <div className="projects-list-wrapper">
            <div className="projects-list-control">
                <div className="projects-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                    />
                </div>
                <div className="projects-list-control-actions">
                    <Button onClick={handleClickInfo}>Thêm thiết bị</Button>
                </div>
            </div>
            <div className="projects-list-table">
                <Table columns={tableColumns} dataSource={devices} bordered />
            </div>
            <DeviceAddModal
                centered
                width={1000}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default DeviceList
