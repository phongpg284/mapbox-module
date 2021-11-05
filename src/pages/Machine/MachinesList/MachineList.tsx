import columns from './columns'
import { Button, Input, Modal, Space, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import MachineAddModal from '../MachineAddModal'
import useFilter from '../../../hooks/useFilter'
const MachineList = () => {
    const [machines, setMachines] = useState([])
    const [response, isFetching, setRequest] = useFetch({} as any)

    useEffect(() => {
        setRequest({
            endPoint: 'https://dinhvichinhxac.online/api/machine/',
            method: 'GET',
        })
    }, [])

    useEffect(() => {
        if (!isFetching && response && response.data && !response.hasError) setMachines(response.data)
    }, [response])

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
        ...columns.slice(0, 1),
        {
            title: 'Tên dự án',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <Link to={`/machines/${record.id}`}>{text}</Link>
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

    const [search, onChangeSearch, filterData] = useFilter(machines, "name");

    return (
        <div className="projects-list-wrapper">
            <div className="projects-list-control">
                <div className="projects-list-control-search">
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                <div className="projects-list-control-actions">
                    <Button onClick={handleClickInfo}>Thêm thiết bị</Button>
                </div>
            </div>
            <div className="projects-list-table">
                <Table columns={tableColumns} dataSource={filterData} bordered />
            </div>
            <MachineAddModal
                centered
                width={1000}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default MachineList
